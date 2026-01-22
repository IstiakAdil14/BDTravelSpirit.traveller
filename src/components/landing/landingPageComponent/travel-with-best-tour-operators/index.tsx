import TravelWithBestTourOperatorsClient from './TravelWithBestTourOperatorsClient';
import { dbConnect } from '@/lib/db/connect';
import TourOperator from '@/models/tourOperator.model';

const TravelWithBestTourOperators = async () => {
  await dbConnect();
  const operators = await TourOperator.find({}).limit(6).lean();

  // Map database fields to frontend expected format
  const mappedOperators = operators.map((op: any) => ({
    _id: op._id.toString(),
    name: op.name,
    slug: op.slug,
    logo: op.logo,
    rating: op.rating,
    reviews: op.reviewCount || 0,
    specialties: op.specializations || [],
    certified: op.verified || false,
    experience: op.stats?.experienceYears ? `${op.stats.experienceYears}+ years` : 'N/A'
  }));

  return <TravelWithBestTourOperatorsClient initialOperators={JSON.parse(JSON.stringify(mappedOperators))} />;
};

export default TravelWithBestTourOperators;
