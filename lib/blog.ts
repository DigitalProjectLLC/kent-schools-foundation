import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  keywords: string[];
  coverImage?: string;
  ogImage?: string;
  canonicalUrl?: string;
  faqSchema?: unknown;
  content: string;
}

export function getAllPosts(): Omit<BlogPost, 'content'>[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx')).map(file => {
    const { data } = matter(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8'));
    return { slug: file.replace('.mdx', ''), title: data.title || '', description: data.description || '', date: data.date || '', author: data.author || 'Kent Schools Foundation', tags: data.tags || [], keywords: data.keywords || [], coverImage: data.coverImage, ogImage: data.ogImage, canonicalUrl: data.canonicalUrl, faqSchema: data.faqSchema };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fp = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  const { data, content } = matter(fs.readFileSync(fp, 'utf-8'));
  return { slug, title: data.title || '', description: data.description || '', date: data.date || '', author: data.author || 'Kent Schools Foundation', tags: data.tags || [], keywords: data.keywords || [], coverImage: data.coverImage, ogImage: data.ogImage, canonicalUrl: data.canonicalUrl, faqSchema: data.faqSchema, content };
}

export function getRelatedPosts(tags: string[], excludeSlug: string): Omit<BlogPost, 'content'>[] {
  return getAllPosts().filter(p => p.slug !== excludeSlug && p.tags?.some((t: string) => tags.includes(t))).slice(0, 3);
}
