"use client";

import Link from "next/link";
import { HeroRain } from "@/components/HeroRain";
import { useLanguage } from "@/i18n/LanguageContext";

const HOME_CONTENT = {
    en: {
        role: "AI Engineer · Backend & Data",
        lede: "Getting AI to write fast is easy. Proving it actually finished is the hard part. I take products from planning to launch on my own, and I put AI into the workflow so its output holds up to inspection.",
        stats: [
            ["3", "Shipped products"],
            ["1,784", "Automated tests"],
            ["0", "PII leaks (eval-verified)"],
            ["8+", "Years in engineering"],
        ],
        startHere: "Start here",
        open: "Open →",
        doors: (postCount: number) => [
            { href: "/projects", title: "Work", text: "3 shipped products and 2 prototypes. Live sites embedded, prototypes playable." },
            { href: "/experience", title: "Experience", text: "From data engineering to AI engineering, 8+ years of work." },
            { href: "/blog", title: "Blog", text: `${postCount} posts on gate tests, multi-agent security and red teaming.` },
            { href: "/contact", title: "Contact", text: "Collaboration or questions, my inbox is open." },
        ],
    },
    zh: {
        role: "AI Engineer · Backend & Data",
        lede: "讓 AI 寫得快不難，難的是證明它真的做完了。我一個人把產品從規劃做到上線，也把 AI 放進工作流程裡，讓它的產出經得起檢查。",
        stats: [
            ["3", "上線作品"],
            ["1,784", "自動化測試"],
            ["0", "個資外洩（eval 驗收）"],
            ["8+", "年工程經驗"],
        ],
        startHere: "從這裡開始",
        open: "打開 →",
        doors: (postCount: number) => [
            { href: "/projects", title: "作品", text: "3 個上線作品、2 個原型，網站直接嵌入、原型直接玩。" },
            { href: "/experience", title: "經歷", text: "從資料工程到 AI 工程，八年多的工作紀錄。" },
            { href: "/blog", title: "文章", text: `守門測試、多代理安全設計、紅隊測試等 ${postCount} 篇。` },
            { href: "/contact", title: "聯絡", text: "合作或提問，都歡迎來信。" },
        ],
    },
};

export function HomeContent({ postCount }: { postCount: number }) {
    const { language } = useLanguage();
    const content = HOME_CONTENT[language];

    return (
        <main>
            <header className="hero">
                <HeroRain />
                <div className="wrap">
                    <p className="prompt-line">~/jill $ whoami</p>
                    <h1 className="name">
                        JILL
                        <span className="cursor" aria-hidden="true" />
                    </h1>
                    <p className="role">{content.role}</p>
                    <p className="lede">{content.lede}</p>
                    <div className="stats">
                        {content.stats.map(([value, label]) => (
                            <div className="stat" key={label}>
                                <b>{value}</b>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <section className="block">
                <div className="wrap">
                    <p className="eyebrow">~/ ls</p>
                    <h2>{content.startHere}</h2>
                    <div className="doors">
                        {content.doors(postCount).map((door, index) => (
                            <Link className="door" href={door.href} key={door.href}>
                                <span className="door-key">{index + 1}</span>
                                <strong>{door.title}</strong>
                                <span>{door.text}</span>
                                <em>{content.open}</em>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
