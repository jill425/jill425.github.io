export type Project = {
    title: string;
    description: string;
    tags: string[];
    github?: string;
    demo?: string;
    ios?: string;
    android?: string;
};

export const projects: Record<"en" | "zh", Project[]> = {
    en: [
        {
            title: "Personal Portfolio",
            description:
                "This website! A single-page portfolio built with React, TypeScript, and Tailwind CSS. Features a blog, project showcase, and timeline.",
            tags: ["React", "TypeScript", "TailwindCSS"],
            github: "https://github.com/jill425/jill425.github.io",
        },
        {
            title: "Civiclear",
            description:
                "Planned and built solo, from product definition and data-source research to implementation and launch. A civic site that makes politics legible for newcomers: every politician, party, issue and office is a clickable node, with campaign promises shown side by side with government records (e.g. city budgets) and a source label on every entry. Covers the 2026 Taiwan mayoral and county elections; data refreshes daily via GitHub Actions.",
            tags: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "Open Data"],
            demo: "https://civiclear.club",
        },
        {
            title: "Good Friday 2026",
            description:
                "An interactive web app built around 3D models.",
            tags: ["React", "Next.js", "Three.js", "AI"],
            github: "https://github.com/jill425/good_friday",
            demo: "https://goodfriday2026.netlify.app/",
        },
        {
            title: "Neonatal Emergency Drug Guide",
            description:
                "A mobile reference app for neonatal emergency medication, built with Flutter and published on iOS and Android.",
            tags: ["Flutter", "Dart", "Mobile App Development"],
        },
        {
            title: "QT Garden",
            description:
                "A Flutter mobile app for daily quiet-time (QT) practice, published on iOS.",
            tags: ["Flutter", "Dart", "Mobile App Development"],
        },
    ],
    zh: [
        {
            title: "個人網站",
            description:
                "這個網站！使用 React、TypeScript 與 Tailwind CSS 建置的單頁作品集。包含文章、專案展示與經歷時間軸等功能。",
            tags: ["React", "TypeScript", "TailwindCSS"],
            github: "https://github.com/jill425/jill425.github.io",
            demo: "https://jill425.github.io",
        },
        {
            title: "公民白 Civiclear",
            description:
                "從產品規劃、資料源調查到實作上線一人獨立完成。讓政治小白一目瞭然的公民網站：每個政治人物、政黨、議題、職位都是可點的節點，政見與實際作為（如市府預算執行）並列不評分，每筆資料都附來源標籤。涵蓋 2026 直轄市長與 16 個縣市長選舉，GitHub Actions 每日自動更新資料。",
            tags: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "Open Data"],
            demo: "https://civiclear.club",
        },
        {
            title: "Good Friday 2026",
            description:
                "結合3D模型的互動式網頁應用",
            tags: ["React", "Next.js", "Three.js", "AI"],
            github: "https://github.com/jill425/good_friday",
            demo: "https://goodfriday2026.netlify.app/",
        },
        {
            title: "新生兒急救藥物指引",
            description:
                "新生兒急救用藥的行動參考工具，使用 Flutter 開發，已上架 iOS 與 Android。",
            tags: ["Flutter", "Dart", "Mobile App Development"],
        },
        {
            title: "靈修花園",
            description:
                "協助每日靈修（QT）的行動應用程式，使用 Flutter 開發，已上架 iOS。",
            tags: ["Flutter", "Dart", "Mobile App Development"],
        },
    ]
};
