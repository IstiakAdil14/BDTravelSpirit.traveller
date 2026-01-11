import { dbConnect } from "@/lib/db/connect";
import { TourModel, ITour } from "@/models/tour.model";
import { AssetModel, IAsset } from "@/models/asset.model";
import { ReviewModel } from "@/models/review.model";
import { TourFAQModel } from "@/models/tourFAQ.model";
import { GuideModel } from "@/models/guide.model";
import { UserModel } from "@/models/user.model"; // Ensure User model is registered for population
import mongoose from "mongoose";
import { Tour, Review, Faq, Guide, Media } from "@/types/tour";

export async function getFullTourBySlug(slug: string) {
    if (!slug) return null;
    await dbConnect();
    // Ensure models are registered
    if (!mongoose.models.User) mongoose.model("User", UserModel.schema);
    if (!mongoose.models.Asset) mongoose.model("Asset", AssetModel.schema);

    const tourDoc = await TourModel.findOne({ slug })
        .populate("heroImage") // Populate heroImage to get publicUrl
        .lean() as (ITour & { heroImage?: IAsset; _id: mongoose.Types.ObjectId }) | null;

    if (!tourDoc) return null;

    const tourId = tourDoc._id;
    const tourIdStr = tourId.toString();

    // Parallel fetches
    const [galleryDocs, reviewDocs, faqDocs, guideDocs, recDocs] = await Promise.all([
        AssetModel.find({ _id: { $in: tourDoc.gallery || [] } }).lean(),
        ReviewModel.find({ tour: tourId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("user", "name avatar") // Populate user name
            .lean(),
        TourFAQModel.find({ tour: tourId }).sort({ createdAt: -1 }).limit(10).lean(),
        GuideModel.find({ _id: { $in: tourDoc.guideIds || [] } }).lean(),
        // Simple recommendation logic: same country
        TourModel.find({
            "destinations.country": tourDoc.destinations?.[0]?.country,
            _id: { $ne: tourId },
            status: "published" // Assuming we only want published tours
        })
            .populate("heroImage")
            .limit(6)
            .lean(),
    ]);

    // --- MAPPERS ---

    const mapTour = (t: any): Tour => {
        const heroAsset = t.heroImage as any;
        return {
            _id: t._id.toString(),
            slug: t.slug,
            title: t.title,
            description: t.summary || t.description || "", // summary is required in schema
            heroImage: heroAsset?.publicUrl || "",
            priceFrom: t.basePrice?.amount,
            durationDays: t.duration?.days,
            location: t.mainLocation?.address ? `${t.mainLocation.address.city || ""}, ${t.mainLocation.address.country || ""}` : t.destinations?.[0]?.country || "",
            rating: t.ratings?.average || 0,
            stats: {
                travelers: t.popularityScore || 0,
                reviews: t.ratings?.count || 0,
            },
            createdAt: t.createdAt?.toISOString(),
            updatedAt: t.updatedAt?.toISOString(),
        };
    };

    const mapMedia = (a: any, index: number): Media => ({
        _id: a._id.toString(),
        tourId: tourIdStr,
        url: a.publicUrl,
        type: a.contentType?.startsWith("video") ? "video" : "image",
        order: index,
    });

    const mapReview = (r: any): Review => ({
        _id: r._id.toString(),
        tourId: tourIdStr,
        userName: (r.user as any)?.name || "Anonymous",
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt?.toISOString(),
    });

    const mapFaq = (f: any): Faq => ({
        _id: f._id.toString(),
        tourId: tourIdStr,
        question: f.question,
        answer: f.answer || "",
        createdAt: f.createdAt?.toISOString(),
    });

    const mapGuide = (g: any): Guide => ({
        _id: g._id.toString(),
        tourId: tourIdStr,
        name: g.companyName,
        rating: 5, // Placeholder as Guide model doesn't have rating yet
        // avatar: ??? Guide model doesn't have avatar. 
    });

    // --- ASSEMBLE ---

    const tour = mapTour(tourDoc);
    const gallery = galleryDocs.map((doc, i) => mapMedia(doc, i));
    const reviews = reviewDocs.map(mapReview);
    const faqs = faqDocs.map(mapFaq);
    const guides = guideDocs.map(mapGuide);
    const recommendations = recDocs.map(mapTour);

    return { tour, gallery, reviews, faqs, guides, recommendations };
}

export async function getTours(options: { limit?: number; status?: string; isFeatured?: boolean } = {}) {
    await dbConnect();
    const query: any = {};
    if (options.status) query.status = options.status;
    if (options.isFeatured !== undefined) query.isFeatured = options.isFeatured;

    const tourDocs = await TourModel.find(query)
        .limit(options.limit || 10)
        .populate("heroImage")
        .lean();

    return tourDocs.map((t: any) => ({
        _id: t._id.toString(),
        slug: t.slug,
        title: t.title,
        description: t.summary || t.description || "",
        heroImage: (t.heroImage as any)?.publicUrl || "",
        priceFrom: t.basePrice?.amount,
        durationDays: t.duration?.days,
        location: t.destinations?.[0]?.city || t.destinations?.[0]?.country || "",
        rating: t.ratings?.average || 0,
        stats: {
            travelers: t.popularityScore || 0,
            reviews: t.ratings?.count || 0,
        },
    }));
}
