import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import { TourModel } from '@/models/tour.model';
import { AssetModel } from '@/models/asset.model';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    try {
        await dbConnect();
        
        const query: any = { status: 'published' };
        
        // Filter by region if provided
        if (region) {
            query.$or = [
                { 'destinations.region': { $regex: new RegExp(region, 'i') } },
                { 'mainLocation.address.region': { $regex: new RegExp(region, 'i') } }
            ];
        }
        
        const tours = await TourModel.find(query)
            .limit(limit)
            .populate('heroImage')
            .lean();
        
        const formattedTours = tours.map((tour: any) => ({
            _id: tour._id.toString(),
            slug: tour.slug,
            title: tour.title,
            description: tour.summary || '',
            heroImage: (tour.heroImage as any)?.publicUrl || '',
            priceFrom: tour.basePrice?.amount,
            durationDays: tour.duration?.days,
            location: tour.destinations?.[0]?.city || tour.destinations?.[0]?.country || '',
            region: tour.destinations?.[0]?.region || tour.mainLocation?.address?.region || '',
            rating: tour.ratings?.average || 0,
            stats: {
                travelers: tour.popularityScore || 0,
                reviews: tour.ratings?.count || 0,
            },
        }));
        
        return NextResponse.json({
            success: true,
            data: formattedTours,
            count: formattedTours.length,
            region: region || 'all'
        });
        
    } catch (error: any) {
        console.error('Error fetching tours:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error.message || 'Failed to fetch tours' 
            }, 
            { status: 500 }
        );
    }
}