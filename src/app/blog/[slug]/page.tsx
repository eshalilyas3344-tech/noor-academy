import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/components/public/BlogDetailPage";
import { demoBlogPosts } from "@/data/sitePages";

export function generateStaticParams() {
  return demoBlogPosts.map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = demoBlogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return <BlogDetailPage post={post} />;
}
