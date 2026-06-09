import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post } from "./posts";

const ARTICLES_DIR = path.join(process.cwd(), "blog-articles");

export function getAllPostsFromFiles(): Post[] {
    if (!fs.existsSync(ARTICLES_DIR)) return [];

    const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

    const posts = files.map((filename) => {
        const slug = filename.replace(/\.md$/, "");
        const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
        const { data, content } = matter(raw);

        return {
            slug,
            title: data.title ?? slug,
            date: data.date ? String(data.date) : "1970-01-01",
            excerpt: data.description ?? "",
            tags: Array.isArray(data.tags) ? data.tags : [],
            content: content.trim(),
        } as Post;
    });

    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlugFromFiles(slug: string): Post | undefined {
    return getAllPostsFromFiles().find((p) => p.slug === slug);
}
