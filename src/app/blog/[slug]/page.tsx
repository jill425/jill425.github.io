import Link from "next/link";
import { BlogHeader } from "@/components/BlogHeader";
import { getAllPostsFromFiles, getPostBySlugFromFiles } from "@/lib/posts-server";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { estimateReadingMinutes } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
    const posts = getAllPostsFromFiles();
    if (posts.length == 0) {
        return [{ slug: 'no-posts-yet' }];
    }
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlugFromFiles(slug);
    if (!post) return {};
    return {
        title: `${post.title} — Jill's Blog`,
        description: post.excerpt,
    };
}

const markdownComponents: Components = {
    table: ({ children }) => (
        <div className="prose-table-wrap">
            <table>{children}</table>
        </div>
    ),
    a: ({ href, children }) => {
        const external = href?.startsWith("http");
        return (
            <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {children}
            </a>
        );
    },
};

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlugFromFiles(slug);
    if (!post) notFound();

    return (
        <>
            <BlogHeader backHref="/blog" backLabel="← All Posts" />

            <main
                style={{
                    maxWidth: "48rem",
                    margin: "0 auto",
                    padding: "3rem 1.5rem 5rem",
                }}
            >
                {/* Tags */}
                <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}
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
                        {estimateReadingMinutes(post.content)} min read
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
                <div className="prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Back link */}
                <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
                    <Link href="/blog" className="btn-outline">
                        ← Back to Blog
                    </Link>
                </div>
            </main>
        </>
    );
}
