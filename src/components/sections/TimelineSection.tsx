"use client";

import { experience } from "@/data/experience";
import { useLanguage } from "@/i18n/LanguageContext";

const TIMELINE_CONTENT = {
    en: {
        sectionLabel: "Experience",
        title: "Experience & Education",
        work: "Work",
        education: "Education"
    },
    zh: {
        sectionLabel: "經歷",
        title: "工作經驗",
        work: "工作",
        education: "教育"
    }
};

export function TimelineSection() {
    const { language } = useLanguage();
    const content = TIMELINE_CONTENT[language];
    return (
        <section
            id="timeline"
            style={{
                background: "white",
                borderTop: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
            }}
        >
            <div className="section">
                {/* Section label */}
                <div className="section-label">
                    <span className="section-label-line" />
                    <span className="section-label-text">{content.sectionLabel}</span>
                </div>

                <h2
                    style={{
                        fontSize: "1.85rem",
                        fontWeight: 800,
                        marginBottom: "3rem",
                        lineHeight: 1.2,
                        color: "var(--color-text)",
                        marginTop: "0.5rem",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {content.title}
                </h2>

                {/* Timeline */}
                <div
                    style={{
                        position: "relative",
                        paddingLeft: "1.75rem",
                    }}
                >
                    {/* Vertical line */}
                    <div
                        style={{
                            position: "absolute",
                            left: "0",
                            top: "0.35rem",
                            bottom: "0.35rem",
                            width: "2px",
                            background: "var(--color-border)",
                            borderRadius: "2px",
                        }}
                    />

                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        {experience[language].map((entry, idx) => (
                            <div
                                key={`${entry.title}-${idx}`}
                                style={{ position: "relative" }}
                            >
                                {/* Dot */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "-1.5rem",
                                        top: "1.1rem",
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                        background:
                                            entry.type === "work"
                                                ? "var(--color-primary)"
                                                : "var(--color-accent)",
                                        border: "2px solid white",
                                        boxShadow: "0 0 0 2px var(--color-border)",
                                        zIndex: 1,
                                    }}
                                />

                                {/* Card */}
                                <div
                                    style={{
                                        border: "1px solid var(--color-border)",
                                        borderLeft: `3px solid ${entry.type === "work" ? "var(--color-primary)" : "var(--color-accent)"}`,
                                        borderRadius: "0.6rem",
                                        padding: "1.5rem 1.75rem",
                                        background: "var(--color-bg)",
                                        transition: "box-shadow 0.2s ease",
                                    }}
                                    className="timeline-card"
                                >
                                    {/* Meta row: type badge + period */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: "1rem",
                                            marginBottom: "0.75rem",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "0.68rem",
                                                fontWeight: 700,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.1em",
                                                color:
                                                    entry.type === "work"
                                                        ? "var(--color-primary)"
                                                        : "var(--color-accent)",
                                            }}
                                        >
                                            {entry.type === "work" ? content.work : content.education}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "0.78rem",
                                                color: "var(--color-text-muted)",
                                                fontWeight: 500,
                                                background: "white",
                                                padding: "0.2rem 0.7rem",
                                                borderRadius: "9999px",
                                                border: "1px solid var(--color-border)",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {entry.period}
                                        </span>
                                    </div>

                                    {/* Title + Org */}
                                    <h3
                                        style={{
                                            fontWeight: 700,
                                            fontSize: "1.05rem",
                                            color: "var(--color-text)",
                                            letterSpacing: "-0.01em",
                                            marginBottom: "0.2rem",
                                        }}
                                    >
                                        {entry.title}
                                    </h3>
                                    <p
                                        style={{
                                            color: "var(--color-text-muted)",
                                            fontSize: "0.875rem",
                                            marginBottom: "1rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {entry.organization}
                                    </p>

                                    {/* Description bullets */}
                                    <ul
                                        style={{
                                            color: "var(--color-text-muted)",
                                            fontSize: "0.875rem",
                                            lineHeight: 1.75,
                                            paddingLeft: "0",
                                            listStyleType: "none",
                                            marginBottom: entry.tags ? "1rem" : 0,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "0.35rem",
                                        }}
                                    >
                                        {entry.description.map((bullet, i) => (
                                            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                                                <span style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: "0.05em", fontSize: "0.7rem" }}>▸</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Tags */}
                                    {entry.tags && (
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingTop: "0.25rem" }}>
                                            {entry.tags.map((tag) => (
                                                <span key={tag} className="tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .timeline-card:hover {
                    box-shadow: 0 4px 20px -6px rgba(79,70,229,0.15);
                }
            `}</style>
        </section>
    );
}
