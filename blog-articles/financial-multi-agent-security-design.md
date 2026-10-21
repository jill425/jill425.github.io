---
title: "把 LLM 當成不可信的潤飾器：金融客服多代理系統的安全設計"
date: "2026-10-21"
description: "在金融、證券情境做 AI 客服，最怕的不是答錯，而是洩漏個資或查到別人的帳戶。這篇整理我做多代理客服原型時的安全設計：查誰的資料寫死在工具層、PII 進出雙向遮蔽、injection 防護與 audit log，以及用 eval 門檻驗收這些保護。"
tags: ["AI Agent", "LLM", "Security", "LangGraph", "deepagents", "Fintech"]
category: "tutorial"
lang: "zh-TW"
draft: false
---

## 一句話核心觀點

**把 LLM 當成不可信的潤飾器，而不是可信的決策者。** 查誰的資料、能不能查、查到的東西能不能給模型看，全部由程式決定；LLM 只負責把「已經查好、遮蔽過」的結構化結果潤飾成自然語句。

## 背景

到職初期，我調研了 AI agent 的常見架構（LangGraph、deepagents），並在金融／證券／投顧情境下做了一個多代理客服原型。場景很典型：客戶登入後想問一般問題、查自己的帳務、問理財建議，三類需求的風險等級完全不同。

金融客服跟一般聊天機器人最大的差別是：**答錯可以修，洩漏不能收回。** 所以這個原型的設計重心不在回答得多聰明，而在把高敏感的資料路徑收斂進受審查的管道。

## 架構：一個 Orchestrator，sub-agent 彼此不互通

```
使用者
  │  /chat（Bearer token → AuthContext）
  ▼
Orchestrator（主代理）
  ├─ injection guard：偵測 prompt injection
  ├─ PII mask（入向）：進 LLM 前遮蔽個資，並把輸入包進 delimiter
  ├─ LLM 路由：判斷意圖，分派給 sub-agent
  │     ├─ customer_service   一般 FAQ／低風險
  │     ├─ account_query      帳務查詢／高個資（ScopeGuard 強制 account_id）
  │     └─ finance_assistant  理財建議／高合規
  ├─ PII unmask（出向）
  └─ 出向洩漏掃描：防止 LLM「腦補」出個資
  │
  └─ 每一步都寫 audit log（先遮蔽再寫）
```

設計原則：

- **單一入口**：所有請求都經過 Orchestrator，sub-agent 之間不能直接溝通，跨領域請求一律退回 Orchestrator。
- **最小權限**：每個 sub-agent 只看得到自己領域的工具與資料。

## 安全設計一：查誰的資料，寫死在工具層

最危險的攻擊是讓模型去查別人的帳戶。常見的錯誤做法是在 prompt 裡叮嚀「只能查使用者自己的資料」，或讓 LLM 自己產生 SQL 的 `WHERE account_id = ...`——只要被誘導一次就破功。

我的做法是加一層 `ScopeGuard`，當作資料存取的最內層保護：

- `ScopeGuard.execute()` 的第一個參數固定是 `auth_ctx`（從登入 token 解出的身分），呼叫端無法跳過。
- `account_id` 過濾由 ScopeGuard 強制注入，不依賴 LLM 或呼叫端自己加 `WHERE`。
- 如果查詢試圖鎖定別的 `account_id`，**直接回空集合**，並記一筆 `cross_account_denied` 到 audit log。

所以即使 LLM 被 prompt injection 誘導、指定了別人的帳號，它也只會拿到空結果。SQL 工具另外還限制只允許 `SELECT`、最多 200 筆、10 秒逾時。

## 安全設計二：PII 雙向遮蔽

- **進 LLM 前**：偵測並遮蔽身分證字號、姓名、電話、email、地址、生日、銀行帳號等敏感欄位，模型看到的是佔位符。哪些欄位敏感，以 `schema.yml` 的 `sensitive: true` 為唯一事實來源。
- **出 LLM 後**：還原佔位符之後，再做一次出向掃描。這一步是為了防止模型「腦補」——它可能自己編出一個看起來像身分證字號的字串。掃到就回安全的錯誤訊息，不把內容送出去。

快取也一樣：cache key 必須包含 `account_id`，含 PII 的內容預設不進快取。

## 安全設計三：Prompt injection 防護

- 對使用者輸入做 pattern 檢測，分成角色覆寫、忽略指令、system prompt 洩漏、jailbreak、delimiter 注入、工具劫持、資料外洩等類別，依嚴重度決定是否放行。
- 使用者輸入一律包在 `<user_input>...</user_input>` 裡；包之前先把輸入中任何變體的 `</user_input>`（大小寫、空白）替換掉，防止使用者用假的關閉標籤逃出範圍，把後面的內容偽裝成 system 指示。

Pattern 檢測擋不住所有攻擊，所以它只是第一道防線；真正的保障是前面兩層——就算 injection 成功，模型也查不到別人的資料、吐不出未遮蔽的個資。

## 安全設計四：Audit log

每次 agent 呼叫、工具呼叫、LLM 呼叫、PII 遮蔽事件都寫成 JSON Lines（`logs/audit/audit-YYYYMMDD.jsonl`），而且**先遮蔽再寫**——audit log 本身不能變成新的個資外洩點。

## 用 eval 門檻驗收安全，而不是用感覺

「我覺得它很安全」不算驗收。這個原型把安全要求寫成 CI 門檻：

| 項目 | 門檻 |
|------|------|
| 整體覆蓋率 | ≥ 80% |
| 資安核心模組覆蓋率 | ≥ 95% |
| Golden test 通過率（每個 sub-agent） | ≥ 80% |
| Prompt injection 防護通過率 | ≥ 95% |
| PII 洩漏事件數 | **= 0** |
| 跨帳戶資料洩漏事件數 | **= 0** |
| `bandit` | 無 High 等級問題 |

eval 資料集分成四類：`golden`（正常案例）、`injection`（注入與 jailbreak 嘗試）、`pii`（含個資的輸入輸出）、`cross_account`（跨帳戶請求必須被擋）。

PII 洩漏的 eval 刻意測兩個方向：一是合成的個資經過遮蔽後，掃描結果必須是 0；二是**模擬 sub-agent 腦補出未授權的個資**，出向掃描必須攔下，並抽樣走一次 Orchestrator 端到端確認回的是安全錯誤。

另外，app 預設使用 `MockLLMProvider`，沒有雲端金鑰也能跑通整條鏈。這讓安全測試可以在 CI 裡確定性地跑，不受模型回應的隨機性影響。

## 目前的限制

這是原型，不是上線系統：目前預設只掛載 `customer_service` 這個 sub-agent，帳務查詢與理財建議的程式和 prompt 已經寫好，但還沒接進預設執行鏈；資料層用 mock 使用者，正式資料庫的介面先預留。金管會 AI 指引是否納入合規範圍也還在確認中。

## 知識點 Takeaways

- **LLM 不該決定「查誰的資料」**：row-level 過濾寫死在工具層，簽章強制帶身分，越權回空集合並留紀錄。
- **PII 要雙向處理**：進模型前遮蔽，出模型後還要再掃，因為模型會「編」出個資。
- **Injection 防護是第一道，不是最後一道**：真正的保障是讓 injection 成功了也拿不到東西。
- **Audit log 也要先遮蔽**：記錄本身不能變成洩漏點。
- **安全要求要量化成門檻**：「洩漏事件數 = 0」「injection 防護 ≥ 95%」比「注意安全」可驗收得多。
- **用 mock provider 讓安全測試確定性地跑**：把模型的隨機性和安全邏輯的正確性分開驗。
