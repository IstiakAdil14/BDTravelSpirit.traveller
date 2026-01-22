import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TourDetailsContent from '@/components/tours/tour-details/TourDetailsContent';

interface TourDetailsPageProps {
  params: Promise<{ slug: string }>;
}

async function getTourBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/tours/slug/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
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
    title: `${tour.title} | BD Travel Spirit`,
    description: tour.summary || tour.description,
    openGraph: {
      title: tour.title,
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
    <div className="min-h-screen bg-gray-50">
      <TourDetailsContent tour={tour} />
    </div>
  );
}