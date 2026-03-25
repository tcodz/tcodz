import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-white">
            My Blog
          </h1>
          <p className="mt-2 text-white/60">
            记录学习与思考
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">
            文章列表
          </h2>
          
          {posts.length === 0 ? (
            <p className="text-white/50">暂无文章</p>
          ) : (
            <ul className="space-y-6">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block p-6 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 hover:bg-black/60 transition-all"
                  >
                    <article>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {post.title}
                      </h3>
                      <time className="text-sm text-white/50">
                        {post.date}
                      </time>
                      {post.excerpt && (
                        <p className="mt-3 text-white/70 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded"
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