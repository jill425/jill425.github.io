import { BlogHeader } from "@/components/BlogHeader";
import { BlogIndex } from "@/components/BlogIndex";
import { getAllPostsFromFiles } from "@/lib/posts-server";

export const metadata = {
    title: "Blog — Jill.dev",
    description: "Notes on backend engineering, data, and putting AI to work reliably.",
};

export default function BlogIndexPage() {
    const posts = getAllPostsFromFiles();

    return (
        <>
            <BlogHeader backHref="/" backLabel="← Home" />
            <BlogIndex posts={posts} />
        </>
    );
}
