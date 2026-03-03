"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

const NAV_ITEMS = {
    en: [
        { label: "About", href: "#about" },
        { label: "Timeline", href: "#timeline" },
        { label: "Projects", href: "#projects" },
        { label: "Blog", href: "#blog" },
        { label: "Contact", href: "#contact" },
    ],
    zh: [
        { label: "關於", href: "#about" },
        { label: "經歷", href: "#timeline" },
        { label: "專案", href: "#projects" },
        { label: "文章", href: "#blog" },
        { label: "聯絡", href: "#contact" },
    ]
};

export function Navbar() {
    const { language, toggleLanguage } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: "all 0.3s ease",
                background: scrolled
                    ? "rgba(248,250,255,0.9)"
                    : "rgba(248,250,255,0.0)",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid transparent",
            }}
        >
            <nav
                style={{
                    maxWidth: "64rem",
                    margin: "0 auto",
                    padding: "0 1.5rem",
                    height: "4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        fontWeight: 800,
                        fontSize: "1.15rem",
                        textDecoration: "none",
                        background:
                            "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Jill.dev
                </Link>

                {/* Desktop nav & Actions */}
                <div className="hidden sm:flex items-center" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                    <ul
                        style={{
                            display: "flex",
                            gap: "2rem",
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        {NAV_ITEMS[language].map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    style={{
                                        textDecoration: "none",
                                        color: "var(--color-text-muted)",
                                        fontWeight: 500,
                                        fontSize: "0.9rem",
                                        transition: "color 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                    ((e.target as HTMLElement).style.color =
                                        "var(--color-primary)")
                                    }
                                    onMouseLeave={(e) =>
                                    ((e.target as HTMLElement).style.color =
                                        "var(--color-text-muted)")
                                    }
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={toggleLanguage}
                        style={{
                            background: "transparent",
                            border: "1px solid var(--color-border)",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "1rem",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "var(--color-text)",
                            transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.borderColor = "var(--color-primary)";
                            (e.target as HTMLElement).style.color = "var(--color-primary)";
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.borderColor = "var(--color-border)";
                            (e.target as HTMLElement).style.color = "var(--color-text)";
                        }}
                    >
                        {language === "en" ? "中文" : "EN"}
                    </button>
                </div>

                {/* Mobile hamburger */}
                {/* <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        padding: "4px",
                    }}
                    className="sm:hidden"
                    aria-label="Toggle menu"
                >
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            style={{
                                display: "block",
                                width: "22px",
                                height: "2px",
                                background: "var(--color-primary)",
                                borderRadius: "2px",
                                transition: "all 0.2s",
                            }}
                        />
                    ))}
                </button> */}
            </nav>

            {/* Mobile menu */}
            {/* {menuOpen && (
                <div
                    style={{
                        background: "rgba(248,250,255,0.97)",
                        backdropFilter: "blur(12px)",
                        borderTop: "1px solid var(--color-border)",
                        padding: "1rem 1.5rem",
                    }}
                    className="sm:hidden"
                >
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                display: "block",
                                padding: "0.65rem 0",
                                textDecoration: "none",
                                color: "var(--color-text)",
                                fontWeight: 500,
                                borderBottom: "1px solid var(--color-border)",
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )} */}
        </header>
    );
}
