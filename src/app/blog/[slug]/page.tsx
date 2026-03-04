import Link from "next/link";
import { getPostBySlug, getAllPosts } from "../../../lib/posts";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};
    return {
        title: `${post.title} — Jill's Blog`,
        description: post.excerpt,
    };
}

function renderContent(content: string) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let codeBlock: string[] = [];
    let inCode = false;
    let codeLang = "";

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith("```")) {
            if (!inCode) {
                inCode = true;
                codeLang = line.slice(3).trim();
                codeBlock = [];
            } else {
                elements.push(
                    <pre key={i}>
                        <code data-lang={codeLang}>{codeBlock.join("\n")}</code>
                    </pre>
                );
                inCode = false;
                codeBlock = [];
            }
            continue;
        }

        if (inCode) {
            codeBlock.push(line);
            continue;
        }

        if (line.startsWith("## ")) {
            elements.push(<h2 key={i}>{line.slice(3)}</h2>);
        } else if (line.startsWith("# ")) {
            elements.push(<h1 key={i}>{line.slice(2)}</h1>);
        } else if (line.trim() === "") {
            // skip blank lines
        } else {
            elements.push(<p key={i}>{line}</p>);
        }
    }

    return elements;
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    return (
        <>
            {/* Minimal nav */}
            <header
                style={{
                    borderBottom: "1px solid var(--color-border)",
                    padding: "1rem 1.5rem",
                    position: "sticky",
                    top: 0,
                    background: "rgba(248,250,255,0.9)",
                    backdropFilter: "blur(12px)",
                    zIndex: 50,
                }}
            >
                <div
                    style={{
                        maxWidth: "48rem",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            textDecoration: "none",
                            background:
                                "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Jill.dev
                    </Link>
                    <Link
                        href="/#blog"
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--color-primary)",
                            textDecoration: "none",
                            fontWeight: 600,
                        }}
                    >
                        ← All Posts
                    </Link>
                </div>
            </header>

            <main
                style={{
                    maxWidth: "48rem",
                    margin: "0 auto",
                    padding: "3rem 1.5rem 5rem",
                }}
            >
                {/* Tags */}
                <div
                    style={{ display: "flex", gap: "0.4rem", marginBottom: "1.25rem" }}
                >
                    {post.tags.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                        fontWeight: 900,
                        lineHeight: 1.15,
                        letterSpacing: "-0.025em",
                        marginBottom: "1rem",
                    }}
                >
                    {post.title}
                </h1>

                {/* Date + reading time */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        marginBottom: "2.5rem",
                        paddingBottom: "2rem",
                        borderBottom: "1px solid var(--color-border)",
                    }}
                >
                    <span
                        style={{
                            color: "var(--color-text-muted)",
                            fontSize: "0.875rem",
                        }}
                    >
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                    <span
                        style={{
                            color: "var(--color-text-muted)",
                            fontSize: "0.875rem",
                        }}
                    >
                        {Math.ceil(post.content.split(" ").length / 200)} min read
                    </span>
                </div>

                {/* Excerpt */}
                <p
                    style={{
                        fontSize: "1.1rem",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.8,
                        marginBottom: "2rem",
                        fontStyle: "italic",
                        borderLeft: "3px solid var(--color-primary)",
                        paddingLeft: "1rem",
                    }}
                >
                    {post.excerpt}
                </p>

                {/* Content */}
                <div className="prose">{renderContent(post.content)}</div>

                {/* Back link */}
                <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
                    <Link href="/#blog" className="btn-outline">
                        ← Back to Blog
                    </Link>
                </div>
            </main>
        </>
    );
}
