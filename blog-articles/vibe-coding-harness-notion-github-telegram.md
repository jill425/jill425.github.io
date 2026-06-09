---
title: "用 Claude 設計 Vibe Coding Harness：Notion × GitHub × Telegram 的 AI 開發流程"
date: "2026-06-09"
description: "與其讓 AI 幫你寫 code，不如讓 AI 管理整個開發流程。這篇記錄我如何用 Claude 設計一套從任務討論到 PR merge 的自動化 harness，串連 Notion、GitHub、Cursor 和 Telegram。"
tags: ["Notion", "GitHub", "Claude", "AI Agent", "Vibe Coding"]
category: "tutorial"
lang: "zh-TW"
draft: false
---

## 一句話核心觀點

與其讓 AI 幫你寫 code，不如讓 AI **管理整個開發流程**——從任務評估、實作、到 PR 通知，你只需要做兩件事：決策，和按下 Merge。

## 我想達到什麼目標？

我有一個已經有方向的專案，每次開始開發前都要做很多「前置作業」：

- 跟 AI 討論功能方向
- 評估技術可行性，哪些檔案會被改到？
- 這個 task 和其他 task 有沒有衝突或可以合併？
- 寫進 GitHub，實作，跑 test，發 PR

這些事大多是**重複性高但需要判斷的工作**，很適合交給 agent。我想設計一套 harness，讓 AI 處理「評估和執行」，我只負責「審閱和決策」。

## 整體架構設計

和 Claude 討論後，確定出這條流水線：

```
Human ↔ AI 討論任務
    ↓
Notion Vibe Tasks DB（Draft）
    ↓
Task-Agent 自動分析 → 寫回 Analysis
    ↓
Human 審閱 → 手動改狀態為 Approved（唯一的人工 gate）
    ↓
Task-Agent 同步到 GitHub Project Issue
    ↓
Vibe-Agent（Cursor）讀取 Issue → 實作 + Unit Test → Push
    ↓
GitHub Action 自動開 PR
    ↓
Telegram Bot 推送通知 → 我按 Approve & Merge
```

整條流程中，**我只需要介入一次**：在 Task-Agent 分析完之後，決定這個 task 可不可以執行。其餘全部自動。

## 設計的核心決策

### 1. Task / Subtask 不需要兩張表

一開始直覺是建兩個 DB，一個放 task，一個放 subtask。但 Claude 提醒我：subtask 和 task 的欄位需求完全相同，差別只在有沒有 parent。

最後的設計是**同一張 DB 的 self-relation**：

- `Parent Task`：有值 = 這是 subtask；空值 = top-level task
- `Sub Tasks`：反向自動同步，不用手動填

Agent 讀取時，只需要過濾 `Parent Task is empty` 就能拿到頂層任務清單，再透過 `Sub Tasks` 往下展開。一張表搞定，查詢也更乾淨。

### 2. Workflow Status 是整個系統的神經中樞

```
Draft → Analyzing → Approved → In Progress → Done
                                             ↘ Dropped
```

這條 select 欄位驅動所有 agent 的觸發邏輯：

- Task-Agent 監聽 `Draft` → 分析後改為 `Analyzing`
- **Human 看完分析，手動改成 `Approved`**（這是唯一的人工 gate）
- Task-Agent 偵測到 `Approved` → 同步 GitHub Issue，改為 `In Progress`
- Vibe-Agent 讀取 GitHub Issue → 實作完成後，狀態改為 `Done`

不依賴 webhook 的複雜邏輯，一個 status 欄位就讓整條流程有明確的觸發點。

### 3. 影響範圍分兩欄記錄

`Affected Files Est`（Task-Agent 預估）和 `Affected Files Actual`（Vibe-Agent 實際回填）分開存放。

原因是**預估和實作之間幾乎一定有落差**。分開記錄可以事後 review：哪些 task 的影響範圍被低估了？哪些 task 的邊界不夠清楚？這些資訊對下一次寫 task 的品質很有幫助。

## 實際建立 Notion DB 的過程

先讓 Claude 查了我現有的 Notion 結構，發現工作區裡有好幾個 Tasks DB（亂掉了）。決定不修舊的，直接建一個乾淨的新 DB。

Claude 直接透過 Notion MCP 操作，整個過程分三步：

**Step 1：建立主體 DB**

包含所有 property：Task Name、Workflow Status、Priority、Project（關聯 Projects DB）、GitHub Issue ID/URL、Acceptance Criteria、Analysis、Affected Files Est/Actual、Task ID（自動 `VT-N`）、Created Time。

**Step 2：加 self-relation**

Self-relation 無法在建立時一起設定，要分兩步。Claude 先建好 DB 拿到 data source ID，再用 `update_data_source` 加入 `Parent Task ↔ Sub Tasks` 和 `Blocked By ↔ Blocking` 四條 self-relation。

這裡遇到一個小狀況：Notion 在加雙向 self-relation 時會自動生成帶 `1` 後綴的重複欄位（`Parent Task 1`、`Sub Tasks 1`），Claude 馬上補了一個 `DROP COLUMN` 把它們清掉。

**Step 3：建三個 Views**

| View | 類型 | 用途 |
|---|---|---|
| 🗂 All Tasks | Table | 所有 task，按建立時間排序 |
| 🚦 Workflow Board | Board | Kanban，按 Workflow Status 分欄 |
| ✅ Approved — Ready for GitHub | Table | 只顯示 Approved，Task-Agent 的工作列表 |

整個 DB 從設計到建好大約 10 分鐘，完全沒有手動點 UI。

## 接下來要做的事

DB 只是第一步，整個 harness 還需要：

1. **Task-Agent**：監聽 Notion `Draft` → 呼叫 GitHub API 讀 codebase 結構 → 分析影響範圍、相依衝突、unit test 策略 → 寫回 `Analysis` 欄位
2. **Approved → GitHub 同步**：Task-Agent 偵測狀態改變，自動建 GitHub Project Issue
3. **Vibe-Agent（Cursor）**：讀取 GitHub Issue，在 Cursor 中實作，完成後以 `[GH-{id}] {title}` 格式 commit push
4. **GitHub Action + Telegram Bot**：push 觸發自動開 PR，Bot 推 inline keyboard 給我，按一下 Approve & Merge

## 心得

這整個設計最讓我滿意的地方是**人工介入點被壓縮到一個**。不是完全放手給 AI，而是把「需要人類判斷」的部分（這個 task 可不可以做）明確分離出來，其他重複性的工作全部交出去。

另一個收穫是意識到「先設計 DB schema 再做 agent」的順序很重要。Agent 的行為其實是 schema 的延伸，欄位設計清不清楚，直接決定 agent 的 prompt 好不好寫。