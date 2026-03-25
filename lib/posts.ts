import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

export interface Post extends PostMetadata {
  content: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getAllPosts(): PostMetadata[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => {
      const realSlug = slug.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, slug);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: realSlug,
        title: data.title || 'Untitled',
        date: data.date || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    content: contentHtml,
  };
}

export function getAllPostSlugs(): { slug: string }[] {
  const slugs = getPostSlugs();
  return slugs.map(slug => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}