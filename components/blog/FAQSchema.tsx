/**
 * Renders FAQ JSON-LD schema from frontmatter data.
 * Handles both FaqItem[] format and full JSON-LD object format.
 *
 * Usage in blog/[slug]/page.tsx:
 * {post.faqSchema && <FAQSchema questions={post.faqSchema as any} />}
 */

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSchema({ questions }: { questions: any }) {
  // Handle both formats: array of {question, answer} OR full JSON-LD object
  let items: FAQItem[] = [];

  if (Array.isArray(questions)) {
    // Standard FaqItem[] format
    items = questions.map((q: any) => ({
      question: q.question || '',
      answer: q.answer || '',
    }));
  } else if (questions && typeof questions === 'object') {
    // Full JSON-LD FAQPage format: { mainEntity: [{ name, acceptedAnswer: { text } }] }
    const entities = questions.mainEntity || questions['mainEntity'] || [];
    if (Array.isArray(entities)) {
      items = entities.map((e: any) => ({
        question: e.name || e.question || '',
        answer: e.acceptedAnswer?.text || e.answer || '',
      }));
    }
  }

  if (items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
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
