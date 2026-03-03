"use client";

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { useLanguage } from "@/i18n/LanguageContext";

const BLOG_CONTENT = {
    en: {
        sectionLabel: "Blog",
        title: "Latest Writing"
    },
    zh: {
        sectionLabel: "文章",
        title: "最新文章"
    }
};

export function BlogSection() {
    const { language } = useLanguage();
    const content = BLOG_CONTENT[language];
    const posts = getAllPosts().slice(0, 3);

    return (
        <section
            id="blog"
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
                        fontSize: "1.75rem",
                        fontWeight: 800,
                        marginBottom: "2rem",
                        lineHeight: 1.2,
                        color: "var(--color-text)",
                        marginTop: "0.5rem",
                    }}
                >
                    {content.title}
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            style={{ textDecoration: "none" }}
                        >
                            <article
                                className="card"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr auto",
                                    alignItems: "center",
                                    gap: "1rem",
                                    cursor: "pointer",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "0.4rem",
                                            flexWrap: "wrap",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        {post.tags.slice(0, 2).map((tag) => (
                                            <span key={tag} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3
                                        style={{
                                            fontWeight: 700,
                                            fontSize: "1rem",
                                            color: "var(--color-text)",
                                            marginBottom: "0.35rem",
                                        }}
                                    >
                                        {post.title}
                                    </h3>
                                    <p
                                        style={{
                                            color: "var(--color-text-muted)",
                                            fontSize: "0.875rem",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                    <div
                                        style={{
                                            color: "var(--color-text-muted)",
                                            fontSize: "0.78rem",
                                            marginBottom: "0.5rem",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {new Date(post.date).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </div>
                                    <span
                                        style={{
                                            color: "var(--color-primary)",
                                            fontWeight: 700,
                                            fontSize: "1.1rem",
                                        }}
                                    >
                                        →
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
