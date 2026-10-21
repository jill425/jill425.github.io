import Link from "next/link";
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
        title: `${post.title} — Jill.dev`,
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
        <main className="block page">
            <article className="wrap article">
                <p className="eyebrow">~/blog/{post.slug}</p>
                <h1 className="article-title">{post.title}</h1>
                <div className="article-meta">
                    <time dateTime={post.date}>{post.date}</time>
                    <span>{estimateReadingMinutes(post.content)} min read</span>
                    {post.tags.map((tag) => (
                        <span className="tag" key={tag}>
                            {tag}
                        </span>
                    ))}
                </div>
                {post.excerpt && <p className="article-excerpt">{post.excerpt}</p>}
                <div className="prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {post.content}
                    </ReactMarkdown>
                </div>
                <div className="article-back">
                    <Link href="/blog" className="btn">
                        ← All posts
                    </Link>
                </div>
            </article>
        </main>
    );
}
