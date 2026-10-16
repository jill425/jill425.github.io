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
            title: "Good Friday 2026",
            description:
                "",
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
