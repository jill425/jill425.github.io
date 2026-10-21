"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { useLanguage } from "@/i18n/LanguageContext";

const BLOG_CONTENT = {
    en: {
        sectionLabel: "Blog",
        title: "Latest Writing",
        viewAll: "View all posts"
    },
    zh: {
        sectionLabel: "文章",
        title: "最新文章",
        viewAll: "看全部文章"
    }
};

const HOME_POST_COUNT = 3;

export function BlogSection({ posts: allPosts }: { posts: Post[] }) {
    const { language } = useLanguage();
    const content = BLOG_CONTENT[language];
    const posts = allPosts.slice(0, HOME_POST_COUNT);

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
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>

                {allPosts.length > HOME_POST_COUNT && (
                    <div style={{ marginTop: "1.75rem", textAlign: "center" }}>
                        <Link href="/blog" className="btn-outline">
                            {content.viewAll} ({allPosts.length}) →
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
