"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const TABS = {
    en: [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Work" },
        { href: "/experience", label: "Experience" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ],
    zh: [
        { href: "/", label: "首頁" },
        { href: "/projects", label: "作品" },
        { href: "/experience", label: "經歷" },
        { href: "/blog", label: "文章" },
        { href: "/contact", label: "聯絡" },
    ],
};

const EFFECTS_LABEL = {
    en: { off: "Effects off", on: "Effects on" },
    zh: { off: "關閉特效", on: "開啟特效" },
};

function isActive(pathname: string, href: string): boolean {
    const path = pathname.replace(/\/$/, "") || "/";
    return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

export function SiteNav() {
    const { language, toggleLanguage } = useLanguage();
    const pathname = usePathname();
    const [calm, setCalm] = useState(false);

    function toggleEffects() {
        const next = !calm;
        document.body.classList.toggle("calm", next);
        setCalm(next);
    }

    return (
        <nav className="nav" aria-label={language === "zh" ? "主選單" : "Main"}>
            <div className="wrap">
                <Link className="logo" href="/">
                    JILL.DEV
                </Link>
                <div className="tabs">
                    {TABS[language].map((tab, index) => (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            aria-current={isActive(pathname, tab.href) ? "page" : undefined}
                        >
                            <i>{index}</i>
                            {tab.label}
                        </Link>
                    ))}
                </div>
                <div className="nav-tools">
                    <button type="button" className="tool" onClick={toggleEffects} aria-pressed={calm}>
                        {calm ? EFFECTS_LABEL[language].on : EFFECTS_LABEL[language].off}
                    </button>
                    <button type="button" className="tool" onClick={toggleLanguage}>
                        {language === "en" ? "中文" : "EN"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
