import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200/50 bg-white/60 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-900">
            My Blog
          </h1>
          <p className="mt-2 text-slate-500">
            记录学习与思考
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            文章列表
          </h2>
          
          {posts.length === 0 ? (
            <p className="text-slate-400">暂无文章</p>
          ) : (
            <ul className="space-y-6">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block p-6 bg-white/70 backdrop-blur-sm rounded-lg border border-slate-200/50 hover:border-slate-300 hover:bg-white/90 transition-all shadow-sm"
                  >
                    <article>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {post.title}
                      </h3>
                      <time className="text-sm text-slate-400">
                        {post.date}
                      </time>
                      {post.excerpt && (
                        <p className="mt-3 text-slate-600 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-violet-100 text-violet-700 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
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