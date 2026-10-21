"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { useLanguage } from "@/i18n/LanguageContext";

const BLOG_INDEX_CONTENT = {
    en: { title: "Blog", empty: "No posts yet." },
    zh: { title: "文章", empty: "還沒有文章。" },
};

const VISIBLE_TAGS = 3;

export function BlogIndex({ posts }: { posts: Post[] }) {
    const { language } = useLanguage();
    const content = BLOG_INDEX_CONTENT[language];

    return (
        <main className="block page">
            <div className="wrap">
                <p className="eyebrow">~/blog</p>
                <h1>{content.title}</h1>
                {posts.length === 0 ? (
                    <p className="sub">{content.empty}</p>
                ) : (
                    <div className="posts">
                        {posts.map((post) => (
                            <Link className="post" href={`/blog/${post.slug}`} key={post.slug}>
                                <time dateTime={post.date}>{post.date}</time>
                                <div>
                                    <strong>{post.title}</strong>
                                    <p>{post.excerpt}</p>
                                    <div className="post-meta">
                                        {post.tags.slice(0, VISIBLE_TAGS).map((tag) => (
                                            <span className="tag" key={tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
