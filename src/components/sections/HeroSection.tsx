"use client";

import { useLanguage } from "@/i18n/LanguageContext";

const HERO_CONTENT = {
    en: {
        greeting: "Hello, I'm",
        name: "Jill",
        role: "AI Engineer · Backend & Data",
        bio: "An AI engineer working across backend and data, with a background in big data platforms and distributed systems. I take products on my own from planning and architecture through implementation and launch, and I put AI to work reliably — gate tests, isolated acceptance and eval thresholds keep AI-written code and LLM features verifiable, not just fast.",
        available: "Open to opportunities",
        scrollHint: "scroll to explore"
    },
    zh: {
        greeting: "你好，我是",
        name: "Jill",
        role: "AI Engineer · Backend & Data",
        bio: "橫跨後端與數據的 AI 工程師，具備大數據平台與分散式系統背景。能獨自把產品從規劃、架構設計一路做到實作上線，並讓 AI 在工作中可靠地發揮作用：用守門測試、隔離驗收與 eval 門檻，讓 AI 寫的 code 與 LLM 功能都可驗證，而不只是快。",
        available: "歡迎合作洽談",
        scrollHint: "往下滑動"
    }
};

const STATS = [
    { en: "Years of Experience", zh: "年工作經驗", value: "8+" },
    { en: "Shipped Products", zh: "上線作品", value: "3" },
    { en: "Tech Stack", zh: "技術棧", value: "14+" },
];

export function HeroSection() {
    const { language } = useLanguage();
    const content = HERO_CONTENT[language];
    return (
        <section
            id="hero"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                padding: "7rem 1.5rem 5rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative background blobs */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "-5%",
                    right: "-8%",
                    width: "55vw",
                    height: "55vw",
                    maxWidth: "700px",
                    maxHeight: "700px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 65%)",
                    pointerEvents: "none",
                }}
            />
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    bottom: "10%",
                    left: "-5%",
                    width: "35vw",
                    height: "35vw",
                    maxWidth: "450px",
                    maxHeight: "450px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 65%)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    maxWidth: "64rem",
                    margin: "0 auto",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    alignItems: "center",
                }}
                className="hero-grid"
            >
                {/* Left — text content */}
                <div>
                    {/* Status pill */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.3rem 0.85rem",
                            borderRadius: "9999px",
                            border: "1px solid rgba(79,70,229,0.25)",
                            background: "rgba(79,70,229,0.06)",
                            marginBottom: "1.75rem",
                        }}
                    >
                        <span
                            style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background: "#22c55e",
                                display: "inline-block",
                                boxShadow: "0 0 0 3px rgba(34,197,94,0.22)",
                            }}
                        />
                        <span
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "var(--color-primary)",
                                letterSpacing: "0.02em",
                            }}
                        >
                            {content.available}
                        </span>
                    </div>

                    {/* Greeting */}
                    <p
                        style={{
                            fontSize: "1rem",
                            color: "var(--color-text-muted)",
                            fontWeight: 500,
                            marginBottom: "0.5rem",
                            letterSpacing: "0.01em",
                        }}
                    >
                        {content.greeting}
                    </p>

                    {/* Name */}
                    <h1
                        style={{
                            fontSize: "clamp(3rem, 7vw, 5.5rem)",
                            fontWeight: 900,
                            lineHeight: 1.0,
                            letterSpacing: "-0.04em",
                            marginBottom: "0.75rem",
                            color: "var(--color-text)",
                        }}
                    >
                        {content.name}
                    </h1>

                    {/* Divider with role */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.85rem",
                            marginBottom: "1.75rem",
                        }}
                    >
                        <div
                            style={{
                                width: "2.5rem",
                                height: "2px",
                                background: "var(--color-primary)",
                                borderRadius: "2px",
                                opacity: 0.7,
                            }}
                        />
                        <p
                            style={{
                                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                                fontWeight: 600,
                                color: "var(--color-primary)",
                                letterSpacing: "0.01em",
                            }}
                        >
                            {content.role}
                        </p>
                    </div>

                    {/* Bio */}
                    <p
                        style={{
                            fontSize: "0.975rem",
                            color: "var(--color-text-muted)",
                            maxWidth: "480px",
                            lineHeight: 1.85,
                            marginBottom: "2.5rem",
                        }}
                    >
                        {content.bio}
                    </p>

                    {/* Stats row */}
                    <div
                        style={{
                            display: "flex",
                            gap: "2rem",
                            paddingTop: "2rem",
                            borderTop: "1px solid var(--color-border)",
                        }}
                    >
                        {STATS.map((stat) => (
                            <div key={stat.value}>
                                <div
                                    style={{
                                        fontSize: "1.6rem",
                                        fontWeight: 800,
                                        color: "var(--color-text)",
                                        letterSpacing: "-0.03em",
                                        lineHeight: 1,
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    style={{
                                        fontSize: "0.72rem",
                                        color: "var(--color-text-muted)",
                                        marginTop: "0.3rem",
                                        fontWeight: 500,
                                        letterSpacing: "0.01em",
                                    }}
                                >
                                    {language === "en" ? stat.en : stat.zh}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — decorative visual block */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "flex-end",
                    }}
                    className="hero-right-col"
                >
                    {/* Abstract code-like card */}
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "340px",
                            background: "#1e1b4b",
                            borderRadius: "1rem",
                            padding: "1.5rem",
                            boxShadow: "0 20px 60px -12px rgba(79,70,229,0.35)",
                            fontFamily: '"Fira Code", monospace',
                            fontSize: "0.8rem",
                            lineHeight: 1.9,
                            color: "#c7d2fe",
                        }}
                    >
                        <div style={{ color: "#818cf8", marginBottom: "0.5rem", fontSize: "0.72rem" }}>// profile.ts</div>
                        <div><span style={{ color: "#7dd3fc" }}>const</span> <span style={{ color: "#a5f3fc" }}>engineer</span> = {"{"}</div>
                        <div style={{ paddingLeft: "1rem" }}>
                            <span style={{ color: "#86efac" }}>name</span>: <span style={{ color: "#fcd34d" }}>&quot;Jill&quot;</span>,
                        </div>
                        <div style={{ paddingLeft: "1rem" }}>
                            <span style={{ color: "#86efac" }}>role</span>: <span style={{ color: "#fcd34d" }}>&quot;AI Engineer · Backend &amp; Data&quot;</span>,
                        </div>
                        <div style={{ paddingLeft: "1rem" }}>
                            <span style={{ color: "#86efac" }}>focus</span>: [
                        </div>
                        <div style={{ paddingLeft: "2rem", color: "#fcd34d" }}>&quot;Backend&quot;,</div>
                        <div style={{ paddingLeft: "2rem", color: "#fcd34d" }}>&quot;AI Tools&quot;,</div>
                        <div style={{ paddingLeft: "2rem", color: "#fcd34d" }}>&quot;Product, End to End&quot;,</div>
                        <div style={{ paddingLeft: "1rem" }}>],</div>
                        <div style={{ paddingLeft: "1rem" }}>
                            <span style={{ color: "#86efac" }}>available</span>: <span style={{ color: "#86efac" }}>true</span>,
                        </div>
                        <div>{"}"}</div>
                    </div>

                    {/* Subtle floating metrics card */}
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "340px",
                            background: "white",
                            borderRadius: "1rem",
                            padding: "1.25rem 1.5rem",
                            border: "1px solid var(--color-border)",
                            boxShadow: "0 4px 24px -8px rgba(0,0,0,0.08)",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <div
                            style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "10px",
                                background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                        </div>
                        <div>
                            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.01em" }}>
                                {language === "en" ? "Reliable AI, Verified" : "可驗證的可靠 AI"}
                            </div>
                            <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: "0.15rem" }}>
                                {language === "en" ? "Gate tests · isolated acceptance · eval thresholds" : "守門測試 · 隔離驗收 · eval 門檻"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div
                style={{
                    position: "absolute",
                    bottom: "2.5rem",
                    left: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    color: "var(--color-text-muted)",
                    fontSize: "0.75rem",
                    opacity: 0.5,
                }}
            >
                <span
                    style={{
                        display: "inline-block",
                        width: "1px",
                        height: "2rem",
                        background: "var(--color-border)",
                    }}
                />
                {content.scrollHint}
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
                    .hero-right-col { display: none !important; }
                }
            `}</style>
        </section>
    );
}
