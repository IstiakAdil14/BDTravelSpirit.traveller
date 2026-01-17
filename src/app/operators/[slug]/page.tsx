import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OperatorDetailPage from '@/components/operators/OperatorDetailPage';
import { dbConnect } from '@/lib/db/connect';
import TourOperator from '@/models/tourOperator.model';

// Get operator from database - handles modern slug format (name-id)
const getOperatorBySlug = async (slug: string) => {
  try {
    await dbConnect();

    // Modern slug format: luxury-voyages-123abc
    // Extract the ID from the end (last 6 characters after the last hyphen)
    const lastHyphenIndex = slug.lastIndexOf('-');
    const idPart = slug.substring(lastHyphenIndex + 1);
    const namePart = slug.substring(0, lastHyphenIndex);

    // Try to find by ID first (more reliable)
    let operator = null;

    // Check if we have a valid ID part (6 characters from _id)
    if (idPart && idPart.length === 6) {
      // Find operator where _id ends with this ID part
      const operators = await TourOperator.find({}).lean();
      operator = operators.find(op => op._id.toString().slice(-6) === idPart);
    }

    // Fallback to slug-based search if ID search fails
    if (!operator) {
      operator = await TourOperator.findOne({ slug: namePart }).lean();
    }

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