import { BlogChart, StatCallout, ComparisonTable, Callout } from '@/components/blog';

/**
 * MDX component mapping — enables using <BlogChart>, <StatCallout>,
 * <ComparisonTable>, and <Callout> directly inside .mdx blog posts.
 *
 * BlogChart is a client component (loads Chart.js), others are server-rendered.
 */
export function useMDXComponents(components: Record<string, React.ComponentType<any>>) {
  return {
    BlogChart,
    StatCallout,
    ComparisonTable,
    Callout,
    ...components,
  };
}
