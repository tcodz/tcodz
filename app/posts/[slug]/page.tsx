import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { getTagClassName } from "@/lib/tagColors";
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
      <header className="border-b border-slate-200/50 bg-white/60 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            ← 返回首页
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <article className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50 shadow-sm">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <time>{post.date}</time>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={getTagClassName(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div
            className="prose prose-slate max-w-none
              prose-headings:text-slate-900
              prose-p:text-slate-600
              prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900
              prose-code:text-violet-600 prose-code:bg-violet-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-200
              prose-blockquote:text-slate-500 prose-blockquote:border-violet-400
              prose-li:text-slate-600
              prose-ol:text-slate-600
              prose-ul:text-slate-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>

      <footer className="border-t border-slate-200/50 mt-auto">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-slate-400">
            Powered by Next.js & GitHub Pages
          </p>
        </div>
      </footer>
    </div>
  );
}