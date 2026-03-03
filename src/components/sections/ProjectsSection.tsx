"use client";

import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";

const PROJECTS_CONTENT = {
    en: {
        sectionLabel: "Projects",
        title: "Selected Work",
        viewAll: "View All on GitHub ↗"
    },
    zh: {
        sectionLabel: "專案",
        title: "個人作品",
        // viewAll: "在 GitHub 上查看全部 ↗"
    }
};

export function ProjectsSection() {
    const { language } = useLanguage();
    const content = PROJECTS_CONTENT[language];
    return (
        <section id="projects" className="section">
            {/* Section label */}
            <div className="section-label">
                <span className="section-label-line" />
                <span className="section-label-text">{content.sectionLabel}</span>
            </div>

            <h2
                style={{
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    marginBottom: "2.5rem",
                    lineHeight: 1.2,
                    color: "var(--color-text)",
                    marginTop: "0.5rem",
                }}
            >
                {content.title}
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1.5rem",
                }}
            >
                {projects[language].map((project) => (
                    <article key={project.title} className="card" style={{ display: "flex", flexDirection: "column" }}>
                        {/* Top accent line */}
                        <div
                            style={{
                                height: "3px",
                                background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                                borderRadius: "2px",
                                marginBottom: "1.25rem",
                                width: "40px",
                            }}
                        />

                        <h3
                            style={{
                                fontWeight: 700,
                                fontSize: "1.05rem",
                                marginBottom: "0.5rem",
                                color: "var(--color-text)",
                            }}
                        >
                            {project.title}
                        </h3>
                        <p
                            style={{
                                color: "var(--color-text-muted)",
                                fontSize: "0.875rem",
                                lineHeight: 1.7,
                                flex: 1,
                                marginBottom: "1rem",
                            }}
                        >
                            {project.description}
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                            {project.tags.map((tag) => (
                                <span key={tag} className="tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem" }}>
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.35rem",
                                        fontSize: "0.82rem",
                                        fontWeight: 600,
                                        color: "var(--color-primary)",
                                        textDecoration: "none",
                                        transition: "opacity 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                        ((e.currentTarget as HTMLElement).style.opacity = "0.7")
                                    }
                                    onMouseLeave={(e) =>
                                        ((e.currentTarget as HTMLElement).style.opacity = "1")
                                    }
                                >
                                    ↗ GitHub
                                </a>
                            )}
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.35rem",
                                        fontSize: "0.82rem",
                                        fontWeight: 600,
                                        color: "var(--color-accent)",
                                        textDecoration: "none",
                                        transition: "opacity 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                        ((e.currentTarget as HTMLElement).style.opacity = "0.7")
                                    }
                                    onMouseLeave={(e) =>
                                        ((e.currentTarget as HTMLElement).style.opacity = "1")
                                    }
                                >
                                    ↗ Live Demo
                                </a>
                            )}
                            {project.ios && (
                                <a
                                    href={project.ios}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.35rem",
                                        fontSize: "0.82rem",
                                        fontWeight: 600,
                                        color: "var(--color-primary)",
                                        textDecoration: "none",
                                        transition: "opacity 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                        ((e.currentTarget as HTMLElement).style.opacity = "0.7")
                                    }
                                    onMouseLeave={(e) =>
                                        ((e.currentTarget as HTMLElement).style.opacity = "1")
                                    }
                                >
                                    ↗ App Store
                                </a>
                            )}
                            {project.android && (
                                <a
                                    href={project.android}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.35rem",
                                        fontSize: "0.82rem",
                                        fontWeight: 600,
                                        color: "var(--color-accent)",
                                        textDecoration: "none",
                                        transition: "opacity 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                        ((e.currentTarget as HTMLElement).style.opacity = "0.7")
                                    }
                                    onMouseLeave={(e) =>
                                        ((e.currentTarget as HTMLElement).style.opacity = "1")
                                    }
                                >
                                    ↗ Google Play
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {/* <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <a
                    href="https://github.com/jill425"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                >
                    {content.viewAll}
                </a>
            </div> */}
        </section>
    );
}
