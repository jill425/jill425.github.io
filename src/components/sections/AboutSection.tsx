"use client";

import { useLanguage } from "@/i18n/LanguageContext";

const ABOUT_CONTENT = {
    en: {
        sectionLabel: "About Me",
        title: "A little about me",
        p1: "As a Data Engineer, I specialize in building big data platforms, designing asynchronous task architectures, and developing distributed web scraping systems. By deeply integrating advanced AI tools into my daily workflow, I significantly accelerate the development cycle and enhance architectural designs. I am highly proficient in Python and Node.js, with hands-on experience in ecosystems like Apache NiFi, Kafka, and Elasticsearch.",
        p2: "I also possess an entrepreneurial mindset, having recently founded a digital agency and successfully launched two commercial mobile apps using Flutter. Whether it's parsing complex data sources, building data lake infrastructure, or developing cross-platform applications, I bridge the gap between technical architecture and business value.",
        skillsLabel: "Skills & Tools",
    },
    zh: {
        sectionLabel: "關於我",
        title: "關於我",
        p1: "專注於大數據處理平台建置、非同步任務架構設計與分散式爬蟲系統開發的 Data Engineer。在近期的專案與創業經驗中，我大量導入各種強大的 AI 輔助開發工具，這不僅顛覆了以往的開發模式，更極大地增進了功能的迭代效率與架構設計的驗證速度。具有 Python、Node.js，並具備 Apache NiFi、Kafka 等大數據生態系實戰經驗。",
        p2: "我也具備帶領產品從零到一的創業者思維，近期創辦數位公司並透過 Flutter 成功上線 App。無論是解析複雜的數據源、建立資料湖基礎設施，或是開發跨平台應用，我都能結合架構思考與業務價值，提供全方位的技術解決方案。",
        skillsLabel: "技術與工具",
    }
};

const SKILLS = [
    { name: "AI Tools", color: "#8a2be2" },
    { name: "Flutter", color: "#02569B" },
    { name: "Python", color: "#3776ab" },
    { name: "Node.js", color: "#68a063" },
    { name: "Java", color: "#b07219" },
    { name: "C#", color: "#178600" },
    { name: "MySQL", color: "#4479A1" },
    { name: "MongoDB", color: "#47A248" },
    { name: "Kafka", color: "#231F20" },
    { name: "Elasticsearch", color: "#005571" },
    { name: "TiDB", color: "#5E3B8F" },
    { name: "Linux", color: "#e8a020" },
    { name: "Docker/K8s", color: "#2496ed" },
    { name: "Apache NiFi", color: "#74B9E3" },
];

export function AboutSection() {
    const { language } = useLanguage();
    const content = ABOUT_CONTENT[language];

    return (
        <section id="about" className="section">
            {/* Section label */}
            <div className="section-label">
                <span className="section-label-line" />
                <span className="section-label-text">{content.sectionLabel}</span>
            </div>

            {/* Two-column layout */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1.1fr 0.9fr",
                    gap: "4rem",
                    alignItems: "start",
                    marginTop: "2rem",
                }}
                className="grid-about"
            >
                {/* Bio */}
                <div>
                    <h2
                        style={{
                            fontSize: "1.85rem",
                            fontWeight: 800,
                            marginBottom: "1.5rem",
                            lineHeight: 1.2,
                            color: "var(--color-text)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {content.title}
                    </h2>
                    <p
                        style={{
                            color: "var(--color-text-muted)",
                            lineHeight: 1.9,
                            marginBottom: "1.25rem",
                            fontSize: "0.975rem",
                        }}
                    >
                        {content.p1}
                    </p>
                    <p
                        style={{
                            color: "var(--color-text-muted)",
                            lineHeight: 1.9,
                            fontSize: "0.975rem",
                        }}
                    >
                        {content.p2}
                    </p>
                </div>

                {/* Skills */}
                <div
                    style={{
                        background: "white",
                        border: "1px solid var(--color-border)",
                        borderRadius: "1rem",
                        padding: "1.75rem",
                        boxShadow: "0 2px 12px -4px rgba(0,0,0,0.06)",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: "var(--color-text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginBottom: "1.25rem",
                            paddingBottom: "0.85rem",
                            borderBottom: "1px solid var(--color-border)",
                        }}
                    >
                        {content.skillsLabel}
                    </h3>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                        }}
                    >
                        {SKILLS.map((skill) => (
                            <span
                                key={skill.name}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    padding: "0.35rem 0.75rem",
                                    borderRadius: "0.4rem",
                                    fontSize: "0.78rem",
                                    fontWeight: 500,
                                    background: "var(--color-bg)",
                                    border: "1px solid var(--color-border)",
                                    color: "var(--color-text)",
                                    transition: "border-color 0.15s, box-shadow 0.15s",
                                }}
                            >
                                <span
                                    style={{
                                        width: "7px",
                                        height: "7px",
                                        borderRadius: "50%",
                                        background: skill.color,
                                        display: "inline-block",
                                        flexShrink: 0,
                                    }}
                                />
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Responsive override */}
            <style>{`
                @media (max-width: 640px) {
                    .grid-about { grid-template-columns: 1fr !important; gap: 2rem !important; }
                }
            `}</style>
        </section>
    );
}
