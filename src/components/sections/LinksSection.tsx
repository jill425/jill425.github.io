"use client";

import { socialLinks } from "@/data/links";
import { useLanguage } from "@/i18n/LanguageContext";

const LINKS_CONTENT = {
    en: {
        sectionLabel: "Contact",
        title: "Get in Touch",
        description: "Whether you want to collaborate, ask a question, or just say hi — my inbox is open."
    },
    zh: {
        sectionLabel: "聯絡",
        title: "與我聯繫",
        description: "無論您是想合作、提問，都歡迎聯繫我。"
    }
};

const ICONS: Record<string, React.ReactNode> = {
    github: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    ),
    linkedin: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    email: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    ),
    resume: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    ),
    twitter: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
};

const LINK_META: Record<string, { label_en: string; label_zh: string; color: string; bg: string }> = {
    github: { label_en: "GitHub", label_zh: "GitHub", color: "#24292e", bg: "#f6f8fa" },
    linkedin: { label_en: "LinkedIn", label_zh: "LinkedIn", color: "#0a66c2", bg: "#f0f7ff" },
    email: { label_en: "Email", label_zh: "電子郵件", color: "var(--color-primary)", bg: "#eef2ff" },
    resume: { label_en: "Resume", label_zh: "履歷", color: "var(--color-accent)", bg: "#ecfeff" },
    twitter: { label_en: "Twitter / X", label_zh: "Twitter / X", color: "#000", bg: "#f9f9f9" },
};

export function LinksSection() {
    const { language } = useLanguage();
    const content = LINKS_CONTENT[language];

    return (
        <section id="contact" className="section" style={{ textAlign: "center" }}>
            {/* Section label */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                }}
            >
                <span className="section-label-line" />
                <span className="section-label-text">{content.sectionLabel}</span>
                <span className="section-label-line" />
            </div>

            <h2
                style={{
                    fontSize: "1.85rem",
                    fontWeight: 800,
                    marginBottom: "0.75rem",
                    lineHeight: 1.2,
                    color: "var(--color-text)",
                    marginTop: "0.5rem",
                    letterSpacing: "-0.02em",
                }}
            >
                {content.title}
            </h2>
            <p
                style={{
                    color: "var(--color-text-muted)",
                    maxWidth: "400px",
                    margin: "0 auto 3rem",
                    lineHeight: 1.75,
                    fontSize: "0.95rem",
                }}
            >
                {content.description}
            </p>

            {/* Link cards */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "0.85rem",
                }}
            >
                {socialLinks.map((link) => {
                    const meta = LINK_META[link.icon] || {};
                    const isEmailLink = link.href.startsWith("mailto:");

                    return (
                        <a
                            key={link.label}
                            href={link.href}
                            target={isEmailLink ? undefined : "_blank"}
                            rel={isEmailLink ? undefined : "noopener noreferrer"}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.65rem",
                                padding: "0.8rem 1.4rem",
                                background: "white",
                                border: "1px solid var(--color-border)",
                                borderRadius: "0.65rem",
                                textDecoration: "none",
                                color: meta.color || "var(--color-primary)",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                transition: "all 0.2s ease",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                                letterSpacing: "-0.01em",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.transform = "translateY(-3px)";
                                el.style.boxShadow = `0 8px 24px -6px rgba(79,102,241,0.2)`;
                                el.style.borderColor = "rgba(79,70,229,0.3)";
                                el.style.background = meta.bg || "white";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.transform = "translateY(0)";
                                el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
                                el.style.borderColor = "var(--color-border)";
                                el.style.background = "white";
                            }}
                        >
                            {ICONS[link.icon]}
                            {language === "en" ? (meta.label_en || link.label) : (meta.label_zh || link.label)}
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
