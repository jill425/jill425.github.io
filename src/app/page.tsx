import { HomeContent } from "@/components/HomeContent";
import { getAllPostsFromFiles } from "@/lib/posts-server";

export default function Home() {
  return <HomeContent postCount={getAllPostsFromFiles().length} />;
}
