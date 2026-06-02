import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { FAQSchema } from '@/components/blog';
import { Clock, ArrowLeft, Calendar, User } from 'lucide-react';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const canonical = post.canonicalUrl ?? `https://kentschoolsfoundation.org/blog/${slug}`;
  return {
    title: `${post.title} | Kent Schools Foundation`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: canonical,
      images: post.coverImage ? [{ url: `https://kentschoolsfoundation.org${post.coverImage}`, alt: post.title }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const canonical = post.canonicalUrl ?? `https://kentschoolsfoundation.org/blog/${slug}`;
  const related = getRelatedPosts(post.tags ?? [], slug);
  const readMin = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));
  const hasPhone = ''.length > 2;

  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: canonical,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Kent Schools Foundation', url: 'https://kentschoolsfoundation.org' },
    publisher: { '@type': 'Organization', name: 'Kent Schools Foundation' },
    keywords: post.tags?.join(', '),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
      {post.faqSchema && <FAQSchema questions={post.faqSchema} />}

      {/* Reading Progress Bar */}
      <div id="reading-progress" className="fixed top-0 left-0 h-1 bg-[#E76F51] z-50 transition-all" style={{ width: '0%' }} />
      <script dangerouslySetInnerHTML={{ __html: `window.addEventListener('scroll',()=>{const t=document.documentElement.scrollTop,d=document.documentElement.scrollHeight-document.documentElement.clientHeight;document.getElementById('reading-progress').style.width=d>0?(t/d)*100+'%':'0%'})` }} />

      <main className="min-h-screen bg-white pt-24 pb-20">
        {/* Back Link */}
        <div className="max-w-3xl mx-auto px-6 mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#1B3A5C] transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to blog
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-3xl mx-auto px-6 mb-10">
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-[11px] font-semibold tracking-[0.15em] text-[#1B3A5C] uppercase bg-[#1B3A5C]/10 px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F1D2E] mb-5 leading-[1.1] tracking-[-0.02em]">{post.title}</h1>
          <p className="text-lg text-slate-500 mb-5 leading-relaxed">{post.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{readMin} min read</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
          </div>
        </header>

        {/* Hero Image */}
        {post.coverImage && (
          <div className="max-w-4xl mx-auto px-6 mb-14">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img src={post.coverImage} alt={post.title} className="w-full aspect-[16/9] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D2E]/20 to-transparent" />
            </div>
          </div>
        )}

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-6
          prose prose-lg
          prose-headings:font-bold prose-headings:tracking-[-0.01em] prose-headings:text-[#0F1D2E]
          prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-5
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:mb-5
          prose-a:text-[#1B3A5C] prose-a:font-semibold prose-a:no-underline prose-a:border-b-2 prose-a:border-[#F4A261]/40 hover:prose-a:border-[#F4A261] hover:prose-a:text-[#E76F51] prose-a:transition-all
          prose-strong:text-[#0F1D2E]
          prose-li:text-slate-600 prose-li:marker:text-[#F4A261]
          prose-blockquote:border-l-[3px] prose-blockquote:border-[#F4A261] prose-blockquote:bg-[#F4A261]/5 prose-blockquote:rounded-r-lg prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic
          prose-hr:border-slate-200 prose-hr:my-10
          prose-img:rounded-xl prose-img:shadow-md
        ">
          <MDXRemote source={post.content} />
        </article>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="max-w-3xl mx-auto px-6 mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-[#0F1D2E] mb-6">Related Posts</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block bg-slate-50 rounded-xl p-5 hover:bg-[#F4A261]/10 transition-colors border border-transparent hover:border-[#F4A261]/30">
                  <h3 className="text-sm font-bold text-[#0F1D2E] group-hover:text-[#1B3A5C] transition-colors leading-snug mb-2 line-clamp-2">{rp.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{rp.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto px-6 mt-20 pt-14 border-t-2 border-[#F4A261]/20 text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-[#1B3A5C] uppercase mb-3 block">Support KSF</span>
          <p className="text-3xl font-bold text-[#0F1D2E] mb-4">Support KSF</p>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">Unlocking brighter futures for every student in Kent. Donate or volunteer today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support" className="inline-flex items-center justify-center px-8 py-4 bg-[#1B3A5C] text-white font-bold rounded-xl hover:bg-[#1B3A5C]/90 active:scale-[0.98] transition-all shadow-lg shadow-[#1B3A5C]/20">Support KSF</Link>
            {hasPhone && <a href="tel:" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#1B3A5C] text-[#1B3A5C] font-bold rounded-xl hover:bg-[#1B3A5C] hover:text-white active:scale-[0.98] transition-all">Call </a>}
          </div>
        </section>
      </main>
    </>
  );
}