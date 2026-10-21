---
title: "用守門測試管住 AI 寫的 code：把規則從 CLAUDE.md 搬進 pytest"
date: "2026-10-21"
description: "AI 會讀 CLAUDE.md，但不保證每次都照做。我在一個從零開發的後端專案裡，把「文件要齊、契約不能亂、migration 要能重跑」這些規則寫成守門測試，讓違規當場變紅，而不是等 code review 才發現。"
tags: ["AI", "Claude Code", "Testing", "pytest", "OpenAPI", "Reliability"]
category: "tutorial"
lang: "zh-TW"
draft: false
---

## 一句話核心觀點

寫在 `CLAUDE.md` 裡的規則是「建議」，寫成測試的規則才是「約束」。AI 每次 context 不同、遵守程度就不同；但 `pytest` 紅了就是紅了，它不能假裝沒看到。

## 背景

今年下半年，我一個人從零開發一個 App 後端（Python／FastAPI），兩個多月做了 20 個業務 domain，大部分 code 是和 Claude Code 一起寫的。專案的 `CLAUDE.md` 寫了不少規則：分層怎麼 import、資料庫命名、對外 API 的格式、OpenAPI 說明怎麼寫……

一開始我以為寫清楚就夠了。實際上：

- 規則寫得越多，AI 越容易漏掉其中幾條，尤其是在 context 已經很長的時候。
- 最常「腐化」的是文件：改了 API 路徑，README 和架構文件裡的舊路徑還在，讀的人分不出是過時了還是自己搞錯。
- code review 抓得到，但那是人在當守門員；我一個人做，review 的注意力是最稀缺的資源。

## 做法：只要一條規則「宣稱窮舉」或「漏了會出事」，就寫成測試

我最後寫了 6 支守門測試和一組分層檢查，加上 95% 的覆蓋率門檻，跟 `ruff` 一起當每次合併的 DoD：

```bash
uv run ruff check . && uv run ruff format --check . && uv run pytest -q
```

### 1. OpenAPI 說明齊全（`test_openapi_doc_coverage`）

- 每支 endpoint 都要有中文 summary；docstring 不准進 spec（docstring 是給工程師看的）。
- 每個參數、每個 schema 欄位都要有 description。
- description 只能描述資料本身（意義、格式、null 的語意），**不准提內部分層或上游系統名**——這條是用 regex 走遍整份 spec 檢查的。

AI 很擅長寫 description，但也很愛「順手」寫出「此欄位來自 XX 上游」這種洩漏內部架構的句子。測試直接擋掉。

### 2. 對外契約（`test_openapi_wire_contract`）

- 純日期欄位一律是 8 碼 `yyyyMMdd` 字串，不准標 `format: date`（否則前端 codegen 會產出 ISO 格式）。
- 時間戳**維持** ISO date-time——這是刻意的決策，改了會損失時分秒且不可逆，所以也寫成測試，防止哪天被「統一格式」。
- 上游的欄位名（像 `stkno`）不准出現在對外契約的任何地方，連 422 錯誤的 key 也不行。
- schema 名要能讀，不准有 pydantic 把 `Annotated[Union]` 展平成的超長名字。

### 3. 文件與程式一致（`test_docs_consistency`）

- `.env.example` 的每個變數都要出現在 README 的環境變數表。
- 每條對前端公開的路由都要出現在 README 的功能表。
- 機器產生的 `superapp-api.yaml` 必須和 `create_app().openapi()` 完全一致，而且檔頭要留著「怎麼重產」的指令——測試紅了的人才知道下一步做什麼。
- 文件裡用行內 code 寫的 `` `METHOD /path` ``，必須真的存在於 spec。

最後這條是被逼出來的：有一張單在需求反覆的期間，架構文件裡的舊端點連續踩了四次。為了避免假紅，比對範圍刻意收斂：只認行內 code、路徑參數正規化成 `{}`、第一段不在 spec 裡的（那是別人的 API）一律略過。

### 4. Migration 規則（`test_migrations`）

資料庫用 Flyway 版本化，規則是：只增加的變更（建表、加可空欄位、加索引）遞增小版；會讓舊版 app 出錯或丟資料的（`DROP`、`RENAME`、`MODIFY`、`UPDATE`、`DELETE`、加無預設值的 `NOT NULL`）要開新大版。

這條規則用文字講，AI 十次有幾次會忘。寫成測試之後，連「偵測器本身判斷對不對」都有測試：

```python
@pytest.mark.parametrize(
    ("sql", "breaking"),
    [
        ("ALTER TABLE t ADD COLUMN a INT NULL", False),
        ("ALTER TABLE t ADD COLUMN a INT NOT NULL DEFAULT 0", False),
        ("ALTER TABLE t ADD COLUMN a INT NOT NULL", True),
        ("ALTER TABLE t DROP COLUMN a", True),
        ("UPDATE t SET a = 1", True),
    ],
)
def test_breaking_detector(sql: str, breaking: bool) -> None:
    assert bool(_breaking(sql)) is breaking
```

另外還檢查：建表都要 `CREATE TABLE IF NOT EXISTS`（可重跑）、版號連續、種子資料要冪等。這些都不連 DB，跑起來是毫秒級。

### 5. 命名規則（`test_naming_convention`）

直接解析 migration 檔的 DDL，斷言命名規則：有 `display_name` 的表必須有 `code` 當識別鍵、`name` 只保留給「文字不是本服務寫的」實體……既有的偏離放進 allowlist，新表不准比照。

這支測試的第一條是 `test_schema_file_parsed`：**解析本身要先可信**，抓不到表就是解析壞了，否則後面全部斷言都會「假綠」。

### 6. 例外分流（`test_error_hierarchy`）

每個 domain 例外都必須繼承三個基底類別之一，全域 handler 才能把它對應到正確的 HTTP status。新增例外時忘了繼承，測試會紅，而不是在 production 回一個 500。

### 7. 分層 import

分層規則（`api/` 不准直接 import `repositories/`、`services/` 不准 import FastAPI）比較單純，用三行 `grep` 檢查就夠了，寫在 `CLAUDE.md` 裡讓 AI 自己跑。

## 效果

- 測試從專案初版的 229 條長到 1,784 條，覆蓋率 95%。
- 「OpenAPI 漏寫說明」「文件提到已刪除的端點」這類問題在 code review 前就消失了，因為 AI 跑測試時就會看到紅、自己修掉。
- 專案方向調整了三次，每次都是大範圍改動，守門測試讓我敢放手讓 AI 改，因為漏掉的地方會被抓出來。

## 寫守門測試的幾個原則

- **錯誤訊息要告訴人下一步**：`f"{path.name} 有大版語句，要放進新的 V<n+1>.1：{found}"` 比 `assert not found` 有用得多。AI 讀得懂訊息，就能自己修。
- **大的 diff 要分段報**：3000 行的 dict 直接 assert 相等，pytest 的 diff 沒人讀得完。逐節列出差異。
- **收斂比對範圍，避免假紅**：假紅一多，大家（包括 AI）就會開始忽略或繞過測試。
- **先驗證檢查器本身**：解析器、偵測器都要有自己的測試，否則守門員本身就是漏洞。
- **不是每條規則都值得寫成測試**：只寫「宣稱窮舉、會悄悄過期」或「漏了會出事」的。其他留在 `CLAUDE.md`。

## 知識點 Takeaways

- **`CLAUDE.md` 是建議，測試是約束**：要 AI 可靠地遵守規則，就把規則變成會紅的東西。
- **文件腐化可以機械化檢查**：README、架構文件、OpenAPI spec 和程式的一致性都能寫成測試。
- **刻意的決策也要寫成測試**：「時間戳不改格式」這種反直覺的決定，最容易被下一次「統一格式」覆蓋掉。
- **好的錯誤訊息讓 AI 能自我修正**：守門測試的讀者不只是人，也是下一輪的 AI。
