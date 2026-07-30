import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TourDetailsContent from '@/components/tours/tour-details/TourDetailsContent';
import { getFullTourBySlug } from '@/lib/tourService';

interface TourDetailsPageProps {
  params: Promise<{ slug: string }>;
}

async function getTourBySlug(slug: string) {
  try {
    const data = await getFullTourBySlug(slug);

    if (!data || !data.tour) return null;

    return {
      ...data.tour,
      reviews: data.reviews,
      faqs: data.faqs,
      gallery: data.gallery,
      recommendations: data.recommendations,
    };
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
}


export async function generateMetadata({ params }: TourDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  
  if (!tour) {
    return {
      title: 'Tour Not Found',
    };
  }

  return {
    title: `${tour.title || 'Tour'} | BD Travel Spirit`,
    description: tour.summary || tour.description,
    openGraph: {
      title: tour.title || 'Tour',
      description: tour.summary || tour.description,
      images: tour.heroImage ? [tour.heroImage.publicUrl] : [],
    },
  };
}

export default async function TourDetailsPage({ params }: TourDetailsPageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 lg:pt-32">
      <TourDetailsContent tour={tour} />
    </div>
  );
}