import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TourDetailsContent from '@/components/tours/tour-details/TourDetailsContent';
import { ourTourLocations } from '@/constants/tour';

interface TourDetailsPageProps {
  params: Promise<{ slug: string }>;
}

async function getTourBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/tours/slug/${slug}`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    // Fallback logic for static tours
    const staticTour = ourTourLocations.find(t => t.name.toLowerCase().replace(/\s+/g, '-') === slug);
    if (staticTour) {
      return {
        _id: staticTour.id,
        title: staticTour.name,
        slug: slug,
        description: staticTour.description,
        summary: staticTour.description,
        heroImage: { publicUrl: staticTour.image },
        basePrice: { currency: '৳', amount: 5000 },
        duration: { days: parseInt(staticTour.duration) || 3, nights: (parseInt(staticTour.duration) || 3) - 1 },
        mainLocation: { address: { city: 'Bangladesh', country: 'BD' } },
        ratings: { average: 4.8, count: 120 },
        wishlistCount: 15,
        categories: ['adventure', 'nature'],
        operatingWindows: [{ seatsTotal: 20 }],
        departure: { date: new Date(Date.now() + 86400000 * 5).toISOString(), seatsTotal: 20, seatsBooked: 17 },
        destinations: [],
        gallery: [{ publicUrl: staticTour.image }],
        isFeatured: true,
        healthInfo: {
          vaccinationRequired: ['COVID-19', 'Typhoid'],
          malariaRiskAreas: ['Chittagong Hill Tracts'],
          waterSafety: 'Bottled water only',
          commonHealthIssues: ['Heat exhaustion', 'Mosquito bites']
        },
        religiousConsiderations: {
          prayerFacilities: true,
          modestDressRequired: true,
          templeEtiquette: ['Remove shoes', 'No photography inside']
        },
        emergencyContacts: {
          policeNumber: '999',
          ambulanceNumber: '199',
        },
        localEmergency: 'In case of severe emergency, contact the local tourist police branch located near Kolatali.',
        packingList: [
          { item: 'Original Passport / NID', required: true, notes: 'Required for hotel check-ins' },
          { item: 'Sunscreen (SPF 50+)', required: true, notes: 'Essential for beach trips' },
          { item: 'Mosquito Repellent', required: true, notes: 'Recommended for evening walks' },
          { item: 'Light Cotton Clothing', required: false, notes: 'Best for humid weather' },
        ],
        pickupOptions: [
          { city: 'Dhaka (Motijheel)', price: 0 },
          { city: 'Chittagong (GEC)', price: 500, currency: '৳' }
        ],
        itinerary: [
          {
            dayNumber: 1,
            title: 'Arrival in Cox\'s Bazar',
            description: 'Arrive at the longest sea beach in the world. Check into the hotel and enjoy the sunset.',
            mealsProvided: ['dinner'],
            travelMode: 'bus',
            travelDistance: '400 km',
            estimatedTime: '10 hours',
          },
          {
            dayNumber: 2,
            title: 'Inani Beach & Himchari',
            description: 'Visit the beautiful Inani stony beach and the waterfalls of Himchari National Park.',
            mealsProvided: ['breakfast', 'lunch'],
            travelMode: 'car',
            travelDistance: '30 km',
            estimatedTime: '45 mins',
          }
        ]
      };
    }
    
    return null;
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