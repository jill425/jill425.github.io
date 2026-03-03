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
            title: "Developer",
            organization: "Sheen Trail Digital (行晨數位有限公司)",
            period: "2025/05 – Present",
            description: [
                "Founded a digital agency and independently developed cross-platform mobile applications using Flutter.",
                "Successfully launched and currently operating two mobile apps in production."
            ],
            tags: ["Flutter", "Dart", "Mobile App Development"],
        },
        {
            type: "work",
            title: "Data Engineer",
            organization: "Inno Tech (伊諾科技有限公司)",
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
            organization: "Chunyo Information (中佑資訊公司)",
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
            title: "開發工程師",
            organization: "行晨數位有限公司 (Sheen Trail Digital)",
            period: "2025/05 – 仍在職",
            description: [
                "創立數位公司，使用 Flutter 獨立開發跨平台行動應用程式。",
                "目前成功上線運營中，負責從需求分析、架構設計到上架維運的完整軟體生命週期。"
            ],
            tags: ["Flutter", "Dart", "Mobile App Development"],
        },
        {
            type: "work",
            title: "數據工程師",
            organization: "伊諾科技有限公司",
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
            organization: "中佑資訊公司",
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
