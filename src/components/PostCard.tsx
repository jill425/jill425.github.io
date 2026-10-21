import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
    return (
        <Link
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
    );
}
