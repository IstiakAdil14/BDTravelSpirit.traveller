import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OperatorDetailPage from '@/components/operators/OperatorDetailPage';
import { tourOperators } from '@/data/tourOperators';

// Get operator from static data - handles modern slug format (name-id)
const getOperatorBySlug = async (slug: string) => {
  try {
    // Extract the name part of the slug in case it has an appended mock ID
    const lastHyphenIndex = slug.lastIndexOf('-');
    const namePart = lastHyphenIndex !== -1 ? slug.substring(0, lastHyphenIndex) : slug;

    // Find operator by exact slug or matching prefix
    const operator = tourOperators.find(
      (op: any) => op.slug === slug || op.slug === namePart || slug.startsWith(op.slug || '')
    );

    return operator ? JSON.parse(JSON.stringify(operator)) : null;
  } catch (error) {
    console.error('Error fetching operator:', error);
    return null;
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const operator = await getOperatorBySlug(slug);

  if (!operator) {
    return {
      title: 'Operator Not Found',
    };
  }

  return {
    title: `${operator.name} - Tour Operator | BD Travel Spirit`,
    description: `${operator.tagline}. Rated ${operator.rating}/5 by ${operator.reviewCount} travelers. Serving ${operator.regions.join(', ')} and more.`,
    openGraph: {
      title: operator.name,
      description: operator.tagline,
      images: [operator.logo],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const operator = await getOperatorBySlug(slug);

  if (!operator) {
    notFound();
  }

  return <OperatorDetailPage operator={operator} />;
}