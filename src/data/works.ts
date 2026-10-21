// 作品展示台的資料。kind 決定螢幕裡放什麼：
// web＝嵌入真的網站；app＝手機外框（還沒有截圖，先放名稱與平台）；demo＝在螢幕裡直接玩
export type WorkKind = "web" | "app" | "demo";
export type WorkGroup = "live" | "lab";
export type DemoKey = "winwin" | "redteam";

export type Work = {
    id: string;
    group: WorkGroup;
    title: string;
    badge: "LIVE" | "DEMO" | "PROTO";
    kind: WorkKind;
    line: string;
    description: string;
    tech: string[];
    url?: string;
    host?: string;
    platforms?: string[];
    icon?: string[];
    demo?: DemoKey;
    note?: string;
};

export const works: Record<"en" | "zh", Work[]> = {
    en: [
        {
            id: "civiclear",
            group: "live",
            title: "Civiclear",
            badge: "LIVE",
            kind: "web",
            url: "https://civiclear.club",
            host: "civiclear.club",
            line: "Politics, legible for newcomers",
            description:
                "Every politician, party, issue and office is a clickable node. Campaign promises sit side by side with government records, unscored, and every entry links to its source. Data refreshes daily. Planned and built solo, from data-source research to launch.",
            tech: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "Open Data"],
        },
        {
            id: "neonatal",
            group: "live",
            title: "Neonatal Emergency Drug Guide",
            badge: "LIVE",
            kind: "app",
            platforms: ["iOS", "Android"],
            icon: [" .---.", " | + |", " |   |", " '---'"],
            line: "Emergency medication reference for newborns",
            description:
                "A mobile reference app for neonatal emergency medication. Built with Flutter and published on iOS and Android.",
            tech: ["Flutter", "Dart"],
        },
        {
            id: "qt-garden",
            group: "live",
            title: "QT Garden",
            badge: "LIVE",
            kind: "app",
            platforms: ["iOS"],
            icon: ["   *", "  \\|/", "---+---", "  /|\\"],
            line: "A companion for daily quiet time",
            description: "A Flutter app for daily quiet-time (QT) practice, published on iOS.",
            tech: ["Flutter", "Dart"],
        },
        {
            id: "good-friday",
            group: "live",
            title: "Good Friday 2026",
            badge: "DEMO",
            kind: "web",
            url: "https://goodfriday2026.netlify.app/",
            host: "goodfriday2026.netlify.app",
            line: "An interactive web page with 3D models",
            description: "An interactive web app built around 3D models.",
            tech: ["React", "Next.js", "Three.js"],
        },
        {
            id: "winwin",
            group: "lab",
            title: "winwin",
            badge: "PROTO",
            kind: "demo",
            demo: "winwin",
            line: "A persuasion battle game. Play a round",
            description:
                "Use move cards to wear down your opponent's resolve while keeping the conversation's feeling high. Full marks only if they walk away feeling like the winner.",
            note: "Simplified: move values and rules come from the game; opponent personalities and the full line library are left out. Opponent lines are in Chinese.",
            tech: ["Flutter", "Dart", "Game design"],
        },
        {
            id: "redteam",
            group: "lab",
            title: "redteam",
            badge: "PROTO",
            kind: "demo",
            demo: "redteam",
            line: "API vulnerability scan + LLM red teaming",
            description:
                "An API vulnerability scanner plus promptfoo red teaming. Calibrated first against a deliberately vulnerable target, then pointed at LLM apps for prompt injection, system prompt leakage and PII.",
            note: "The report comes from the built-in demo target, not a real system.",
            tech: ["Node.js", "promptfoo", "OWASP API", "LLM"],
        },
    ],
    zh: [
        {
            id: "civiclear",
            group: "live",
            title: "公民白",
            badge: "LIVE",
            kind: "web",
            url: "https://civiclear.club",
            host: "civiclear.club",
            line: "讓政治小白看懂每位政治人物",
            description:
                "每個政治人物、政黨、議題、職位都是可以點的節點。政見與市府紀錄並列不評分，每筆資料都附出處，資料每天自動更新。一個人從規劃、資料源調查做到上線。",
            tech: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "開放資料"],
        },
        {
            id: "neonatal",
            group: "live",
            title: "新生兒急救藥物指引",
            badge: "LIVE",
            kind: "app",
            platforms: ["iOS", "Android"],
            icon: [" .---.", " | + |", " |   |", " '---'"],
            line: "新生兒急救用藥的行動參考工具",
            description: "新生兒急救用藥的行動參考工具。Flutter 開發，已上架 iOS 與 Android。",
            tech: ["Flutter", "Dart"],
        },
        {
            id: "qt-garden",
            group: "live",
            title: "靈修花園",
            badge: "LIVE",
            kind: "app",
            platforms: ["iOS"],
            icon: ["   *", "  \\|/", "---+---", "  /|\\"],
            line: "陪伴每日靈修（QT）的 App",
            description: "協助每日靈修（QT）的行動 App。Flutter 開發，已上架 iOS。",
            tech: ["Flutter", "Dart"],
        },
        {
            id: "good-friday",
            group: "live",
            title: "Good Friday 2026",
            badge: "DEMO",
            kind: "web",
            url: "https://goodfriday2026.netlify.app/",
            host: "goodfriday2026.netlify.app",
            line: "結合 3D 模型的互動式網頁",
            description: "結合 3D 模型的互動式網頁。",
            tech: ["React", "Next.js", "Three.js"],
        },
        {
            id: "winwin",
            group: "lab",
            title: "winwin",
            badge: "PROTO",
            kind: "demo",
            demo: "winwin",
            line: "說服攻防遊戲，直接玩一場",
            description:
                "用招式卡打掉對手的「堅持」，同時顧好聊天的「感受」。讓對方覺得自己是贏家才是滿分。",
            note: "簡化版：招式數值與規則取自原作，對手人格與完整台詞庫未放入。",
            tech: ["Flutter", "Dart", "遊戲設計"],
        },
        {
            id: "redteam",
            group: "lab",
            title: "redteam",
            badge: "PROTO",
            kind: "demo",
            demo: "redteam",
            line: "API 弱點掃描 + LLM 紅隊測試",
            description:
                "API 弱點掃描器加 promptfoo 紅隊測試。先用刻意留弱點的靶機校準，再測 LLM 的 injection、system prompt 洩漏與個資。",
            note: "報告資料來自內建示範靶機，不是真實目標。",
            tech: ["Node.js", "promptfoo", "OWASP API", "LLM"],
        },
    ],
};
