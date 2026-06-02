import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Kent Schools Foundation",
  description: "Insights and stories about Kent School District, education programs, fundraising, and community involvement from the Kent Schools Foundation.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B3A5C] mb-4 tracking-[-0.02em]">KSF Blog</h1>
        <p className="text-lg text-slate-600 mb-12">Stories, insights, and resources for Kent students, families, and educators.</p>

        {posts.length === 0 ? (
          <p className="text-slate-500">No posts yet — check back soon.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-slate-200 p-6 hover:border-[#F4A261]/40 hover:bg-[#F4A261]/5 transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-semibold tracking-[0.15em] text-[#1B3A5C] uppercase bg-[#1B3A5C]/10 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-[#0F1D2E] group-hover:text-[#1B3A5C] transition-colors mb-2">{post.title}</h2>
                <p className="text-sm text-slate-500 mb-3">{post.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#F4A261] group-hover:gap-2 transition-all">Read more <ArrowRight className="w-4 h-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <section className="mt-20 pt-14 border-t-2 border-[#F4A261]/20 text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-[#1B3A5C] uppercase mb-3 block">Support KSF</span>
          <p className="text-3xl font-bold text-[#0F1D2E] mb-4">Help Us Do More</p>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">Your donation funds classroom grants, student programs, and educational resources across the Kent School District.</p>
          <Link href="/support" className="inline-flex items-center justify-center px-8 py-4 bg-[#1B3A5C] text-white font-bold rounded-xl hover:bg-[#1B3A5C]/90 active:scale-[0.98] transition-all shadow-lg shadow-[#1B3A5C]/20">Support KSF</Link>
        </section>
      </div>
    </main>
  );
}
