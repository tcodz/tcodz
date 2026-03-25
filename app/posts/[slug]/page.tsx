import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return { title: "文章未找到" };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="text-white/60 hover:text-white transition-colors"
          >
            ← 返回首页
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-white/50">
              <time>{post.date}</time>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 text-white/70 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div
            className="prose prose-invert max-w-none
              prose-headings:text-white
              prose-p:text-white/80
              prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-violet-300 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
              prose-blockquote:text-white/70 prose-blockquote:border-violet-400/50
              prose-li:text-white/80
              prose-ol:text-white/80
              prose-ul:text-white/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>

      <footer className="border-t border-white/10 mt-auto">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-white/40">
            Powered by Next.js & GitHub Pages
          </p>
        </div>
      </footer>
    </div>
  );
}