"use client";

import type { Post } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { useLanguage } from "@/i18n/LanguageContext";

const BLOG_INDEX_CONTENT = {
    en: {
        sectionLabel: "Blog",
        title: "All Posts",
        empty: "No posts yet.",
    },
    zh: {
        sectionLabel: "文章",
        title: "全部文章",
        empty: "還沒有文章。",
    },
};

export function BlogIndex({ posts }: { posts: Post[] }) {
    const { language } = useLanguage();
    const content = BLOG_INDEX_CONTENT[language];

    return (
        <main className="section" style={{ maxWidth: "48rem", paddingTop: "3rem" }}>
            <div className="section-label">
                <span className="section-label-line" />
                <span className="section-label-text">{content.sectionLabel}</span>
            </div>

            <h1
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
            </h1>

            {posts.length === 0 ? (
                <p style={{ color: "var(--color-text-muted)" }}>{content.empty}</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            )}
        </main>
    );
}
