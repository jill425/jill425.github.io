export type TimelineEntry = {
    type: "work" | "education";
    title: string;
    organization: string;
    period: string;
    description: string[];
    tags?: string[];
};

export const experience: Record<"en" | "zh", TimelineEntry[]> = {
    en: [
        {
            type: "work",
            title: "AI Engineer / Backend Engineer",
            organization: "Securities Company",
            period: "2026/06 – Present",
            description: [
                "Built an app backend from scratch (Python / FastAPI) as the sole backend engineer: planned the architecture and phased roadmap, and delivered 20 business domains in just over two months, normalizing data from trading, market-data and third-party upstreams into one API contract.",
                "Automated quality gates: grew the test suite from 229 to 1,784 tests at 95% coverage, plus gate tests that mechanically enforce OpenAPI documentation, external contract rules, doc–code consistency and re-runnable migrations.",
                "Set up operations groundwork: versioned database changes with Flyway, a cron sidecar with cross-process locks, ELK structured logging with request IDs and full error chains, a unified error contract, and log-scrubbing rules for sensitive data.",
                "Filled product gaps while requirements were still open: scoped and built an admin console with a drag-and-drop layout editor, and learned Flutter to build a component preview site so PMs and operators can compose screens themselves.",
                "Made AI-assisted development reliable: built a Claude Code workflow that separates task writing, implementation and isolated acceptance testing (tied to GitLab issues and merge requests), where AI output only counts as done with evidence from tests actually run; encoded project rules as gate tests so violations fail immediately instead of relying on the model to remember them.",
                "Researched AI agent architectures (LangGraph, deepagents) and prototyped a multi-agent customer-service system for a financial setting that treats the LLM as an untrusted rephraser: account scoping enforced in the tool layer, two-way PII masking, prompt-injection defenses and audit logs, verified by eval thresholds (zero PII or cross-account leaks, ≥95% injection defense)."
            ],
            tags: ["Python", "FastAPI", "MySQL", "Flyway", "ELK", "Docker", "Claude Code", "LangGraph", "promptfoo"],
        },
        {
            type: "work",
            title: "Developer",
            organization: "Independent Developer",
            period: "2025/05 – 2026/05",
            description: [
                "Freelance developer building cross-platform mobile applications with Flutter.",
                "Successfully launched and currently operating two mobile apps in production, owning the full lifecycle from requirements analysis and architecture to store release and maintenance."
            ],
            tags: ["Flutter", "Dart", "Mobile App Development"],
        },
        {
            type: "work",
            title: "Data Engineer",
            organization: "Data Services Company",
            period: "2020/07 – 2025/01",
            description: [
                "Architected and deployed Apache NiFi on GCP as a mid-layer big data platform to orchestrate and migrate data lake flows.",
                "Developed distributed data processing pipelines using Kafka, TiDB, MongoDB, Elasticsearch, PubSub, and RabbitMQ tailored to various data structures and load requirements.",
                "Built high-availability web scraping systems including parsing WebSocket pushed data, and maintained Squid Proxy clusters to ensure high stability and mask footprints.",
                "Developed asynchronous task queues using Python, Celery, and Node.js to handle massive data sets, and refactored core data services for better scalability.",
                "Maintained and optimized legacy Java backend services, expanding event processing capabilities and handling real-time data anomaly troubleshooting.",
                "Implemented robust system and API monitoring using Prometheus and Grafana, integrating real-time Slack alerts to improve overall system SLA."
            ],
            tags: ["Apache NiFi", "Kafka", "TiDB", "Python", "Node.js", "Java", "GCP", "Kubernetes"],
        },
        {
            type: "work",
            title: "Software Engineer",
            organization: "Software Company",
            period: "2017/08 – 2019/06",
            description: [
                "Developed multi-dimensional business reporting systems to provide BI teams with high-quality metrics, supporting recommendation system iterations.",
                "Designed real-time batch processing modules for complex reward logic, handling millions of records to ensure 100% financial data accuracy.",
                "Automated operations and alert systems using Bash scripting and Telegram bots."
            ],
            tags: ["Data Processing", "Linux", "Bash", "MySQL"],
        },
        {
            type: "work",
            title: "Software Engineer",
            organization: "First Software Engineering Role",
            period: "2017/01 - 2017/12",
            description: [
                "Quickly adapted to a multi-language development environment to deliver cross-domain projects.",
                "Developed MVC e-commerce platforms using C# ASP.NET Core, built open-data weather crawlers in Python, and maintained legacy POS systems iteratively."
            ],
            tags: ["Java", "C#", "ASP.NET", "Python"],
        },
    ],
    zh: [
        {
            type: "work",
            title: "AI 工程師／後端工程師",
            organization: "證券公司",
            period: "2026/06 – 仍在職",
            description: [
                "獨立負責、從零建置 App 後端服務（Python／FastAPI）：自主規劃架構與分階段路線圖，兩個多月交付 20 個業務 domain，把交易、行情與第三方資料等多個上游正規化成統一的 API 契約。",
                "品質自動化：測試由 229 條成長到 1,784 條、覆蓋率 95%；另以守門測試機械檢查 OpenAPI 說明、對外契約、文件與程式一致、migration 可重跑等規則，漏寫當場失敗。",
                "維運基礎：導入 Flyway 版本化資料庫變更、cron sidecar 排程與跨 process 鎖、ELK 結構化 log（帶 request_id 與完整錯誤鏈），並定義統一錯誤契約與敏感資料不落 log 的規則。",
                "需求只給大方向時主動補位：自行規劃並建置營運後台與拖拉式版面編輯器，並自學 Flutter 建元件預覽站，讓 PM 與操作人員能自行組版、預覽畫面。",
                "讓 AI 協作開發可靠：以 Claude Code 建立建單、實作、隔離驗收分離的流程（與 GitLab issue／MR 綁定），AI 的產出要附實際跑過的證據才算完成；並把專案規則寫成守門測試，違規當場失敗，不靠模型記得。",
                "調研 AI agent 架構（LangGraph、deepagents），實作金融情境的多代理客服原型：把 LLM 當不可信的潤飾器，帳戶範圍寫死在工具層、PII 雙向遮蔽、prompt injection 防護與 audit log，並以 eval 門檻驗收（個資與跨帳戶洩漏 = 0、injection 防護 ≥ 95%）。"
            ],
            tags: ["Python", "FastAPI", "MySQL", "Flyway", "ELK", "Docker", "Claude Code", "LangGraph", "promptfoo"],
        },
        {
            type: "work",
            title: "開發工程師",
            organization: "獨立開發者",
            period: "2025/05 – 2026/05",
            description: [
                "獨立接案開發，使用 Flutter 開發跨平台行動應用程式。",
                "目前成功上線運營中，負責從需求分析、架構設計到上架維運的完整軟體生命週期。"
            ],
            tags: ["Flutter", "Dart", "Mobile App Development"],
        },
        {
            type: "work",
            title: "數據工程師",
            organization: "資料服務公司",
            period: "2020/07 – 2025/01",
            description: [
                "在 GCP 建置 Apache NiFi 作為大數據處理平台中介層，統一調度與搬移資料湖數據流，確保基礎建設高效產出。",
                "開發與優化分散式系統，依據不同數據結構與場景，結合 Kafka, TiDB, MongoDB, Elasticsearch, PubSub 等進行高效儲存與處理。",
                "開發高可用爬蟲系統：解析目標網站 (包含 WebSocket 即時推送)，並建置與維護 Squid Proxy 叢集以優化爬網穩定度。",
                "以 Python、Celery 與 RabbitMQ 構建非同步任務隊列處理海量數據；並使用 Node.js 重構核心數據服務以提升系統擴展性。",
                "維護與優化既有 Java 後端服務，擴增賽事事件處理能力，並即時排查及修復數據異常。",
                "監控與警報機制建置：整合 Prometheus 與 Grafana 監測機器狀態、數據流與 API 端點，並結合 Slack 即時發送警示以確保服務 SLA。"
            ],
            tags: ["Apache NiFi", "Kafka", "TiDB", "Python", "Node.js", "Java", "GCP", "Kubernetes"],
        },
        {
            type: "work",
            title: "軟體工程師",
            organization: "軟體公司",
            period: "2017/08 – 2019/06",
            description: [
                "負責全站遊戲數據即時計算與報表產出。",
                "開發多維度業務報表系統，支援 BI 團隊推薦系統模型迭代。",
                "設計百萬級數據批次計算模組，執行複雜的反水獎勵邏輯，確保財務數據 100% 準確。",
                "在 Linux 環境下使用 Bash 與 Telegram Bot 建立自動化維運與即時數據異常通報機制。"
            ],
            tags: ["Data Processing", "Linux", "Bash", "MySQL"],
        },
        {
            type: "work",
            title: "軟體工程師",
            organization: "第一份工程師工作",
            period: "2017/01 - 2017/12",
            description: [
                "於短時間內靈活適應多語言開發環境，參與跨領域專案交付。",
                "使用 C# ASP.NET Core 開發具備 MVC 架構之電商平台後端；使用 Python 介接並解析政府開放氣象 API，以及維護 ASP.NET Web Forms 的 POS 系統。"
            ],
            tags: ["Java", "C#", "ASP.NET", "Python"],
        },
    ]
};
