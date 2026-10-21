import { BlogIndex } from "@/components/BlogIndex";
import { getAllPostsFromFiles } from "@/lib/posts-server";

export const metadata = {
    title: "Blog — Jill.dev",
    description: "Notes on backend engineering, data, and putting AI to work reliably.",
};

export default function BlogIndexPage() {
    return <BlogIndex posts={getAllPostsFromFiles()} />;
}
