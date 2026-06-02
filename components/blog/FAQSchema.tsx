/**
 * Renders FAQ JSON-LD schema from frontmatter data.
 * Include this in your blog post page to get FAQ rich results in Google.
 *
 * Usage in blog/[slug]/page.tsx:
 * {post.faqSchema && <FAQSchema questions={post.faqSchema} />}
 */

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSchema({ questions }: { questions: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}