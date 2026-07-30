import { dbConnect } from "@/lib/db/connect";
import TourModel from "@/models/tours/tour.model";
import { AssetModel } from "@/models/assets/asset.model";
import AssetFileModel from "@/models/assets/asset-file.model";
import { ReviewModel } from "@/models/tours/review.model";
import { TourFAQModel } from "@/models/tours/tourFAQ.model";
import GuideModel from "@/models/guide/guide.model";
import { UserModel } from "@/models/user.model";
import { TravelerModel } from "@/models/travelers/traveler.model";
import { TOUR_STATUS } from "@/constants/tour";
import mongoose from "mongoose";
import { Review, Faq, Guide, Media } from "@/types/tour";

const assetFilePopulate = { path: "file", select: "publicUrl contentType" };

const getAssetUrl = (asset: { file?: { publicUrl?: string }; publicUrl?: string } | null) =>
    asset?.file?.publicUrl ?? asset?.publicUrl ?? "";

const getAssetContentType = (asset: { file?: { contentType?: string }; contentType?: string } | null) =>
    asset?.file?.contentType ?? asset?.contentType ?? "";

export async function getFullTourBySlug(slug: string) {
    if (!slug) return null;
    await dbConnect();
    // Ensure models are registered
    if (!mongoose.models.User) mongoose.model("User", UserModel.schema);
    if (!mongoose.models.Traveler) mongoose.model("Traveler", TravelerModel.schema);
    if (!mongoose.models.Asset) mongoose.model("Asset", AssetModel.schema);
    if (!mongoose.models.AssetFile) mongoose.model("AssetFile", AssetFileModel.schema);

    const tourDoc = await TourModel.findOne({ slug })
        .populate({ path: "heroImage", populate: assetFilePopulate })
        .populate({ path: "gallery", populate: assetFilePopulate })
        .populate({ path: "destinations.images", populate: assetFilePopulate })
        .populate({ path: "destinations.attractions.images", populate: assetFilePopulate })
        .lean() as any;

    if (!tourDoc) return null;

    const tourId = tourDoc._id;
    const tourIdStr = tourId.toString();

    // Parallel fetches for other related models
    const [reviewDocs, faqDocs, guideDocs, recDocs] = await Promise.all([
        ReviewModel.find({ tour: tourId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("user", "name avatar")
            .lean(),
        TourFAQModel.find({ tour: tourId }).sort({ createdAt: -1 }).limit(10).lean(),
        tourDoc.companyId
            ? GuideModel.find({ _id: tourDoc.companyId }).lean()
            : Promise.resolve([]),
        TourModel.find({
            _id: { $ne: tourId },
            status: { $in: [TOUR_STATUS.ACTIVE, TOUR_STATUS.PUBLISHED] },
            deletedAt: null,
            $or: [
                { district: tourDoc.district },
                { categories: { $in: tourDoc.categories && tourDoc.categories.length > 0 ? tourDoc.categories : [null] } },
                { tags: { $in: tourDoc.tags && tourDoc.tags.length > 0 ? tourDoc.tags : [null] } }
            ]
        })
            .populate({ path: "heroImage", populate: assetFilePopulate })
            .limit(3)
            .lean(),
    ]);

    // --- MAPPERS ---

    const mapTour = (t: any): any => {
        const heroImage = t.heroImage
            ? {
                ...t.heroImage,
                publicUrl: getAssetUrl(t.heroImage),
                contentType: getAssetContentType(t.heroImage),
            }
            : t.heroImage;

        const mapAsset = (asset: any) =>
            asset
                ? {
                    ...asset,
                    publicUrl: getAssetUrl(asset),
                    contentType: getAssetContentType(asset),
                }
                : asset;

        return {
            ...t,
            _id: t._id.toString(),
            heroImage,
            gallery: (t.gallery || []).map(mapAsset),
            destinations: (t.destinations || []).map((destination: any) => ({
                ...destination,
                images: (destination.images || []).map(mapAsset),
                attractions: (destination.attractions || []).map((attraction: any) => ({
                    ...attraction,
                    images: (attraction.images || []).map(mapAsset),
                })),
            })),
            priceFrom: t.basePrice?.amount,
            durationDays: t.duration?.days,
            location: t.mainLocation?.address?.city
                ? `${t.mainLocation.address.city}${t.mainLocation.address.district ? `, ${t.mainLocation.address.district}` : ""}`
                : t.district || t.division || "",
            region: t.mainLocation?.address?.region || t.division || "",
            rating: t.ratings?.average || 0,
            stats: {
                travelers: t.popularityScore || 0,
                reviews: t.ratings?.count || 0,
            },
            createdAt: t.createdAt?.toISOString ? t.createdAt.toISOString() : t.createdAt,
            updatedAt: t.updatedAt?.toISOString ? t.updatedAt.toISOString() : t.updatedAt,
        };
    };

    const mapMedia = (a: any, index: number): Media => ({
        _id: a._id.toString(),
        tourId: tourIdStr,
        url: getAssetUrl(a),
        type: getAssetContentType(a).startsWith("video") ? "video" : "image",
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
        bio: g.bio || '',
        phone: g.owner?.phone || '',
        social: g.social || [],
        address: g.address || {},
        status: g.status,
        rating: 5,
    });

    // --- ASSEMBLE ---

    const guides = guideDocs.map(mapGuide);
    const tour = { ...mapTour(tourDoc), guide: guides[0] || null };
    const gallery = (tourDoc.gallery || []).map((doc: any, i: number) => mapMedia(doc, i));
    const reviews = reviewDocs.map(mapReview);
    const faqs = faqDocs.map(mapFaq);
    const recommendations = recDocs.map(mapTour);

    return { tour, gallery, reviews, faqs, guides, recommendations };
}

export async function getTours(options: { limit?: number; status?: string; isFeatured?: boolean; search?: string; startDate?: string; endDate?: string } = {}) {
    await dbConnect();
    const query: any = {};
    if (options.status) {
        if (options.status === "published") {
            query.status = { $in: ["active", "published"] };
        } else {
            query.status = options.status;
        }
    }
    if (options.isFeatured !== undefined) query.featured = options.isFeatured;

    if (options.search) {
        query.$or = [
            { title: { $regex: options.search, $options: "i" } },
            { summary: { $regex: options.search, $options: "i" } },
            { district: { $regex: options.search, $options: "i" } },
            { division: { $regex: options.search, $options: "i" } },
            { slug: { $regex: options.search, $options: "i" } }
        ];
    }

    if (options.startDate || options.endDate) {
        const dateQuery: any = {};
        if (options.startDate) {
            dateQuery.$gte = new Date(options.startDate);
        }
        if (options.endDate) {
            dateQuery.$lte = new Date(options.endDate);
        }

        // We want tours that either have a departure date in range OR an operating window overlapping the range
        // If query.$or already exists (from search), we use $and to combine them
        const dateConditions = [
            { "departure.date": dateQuery },
            { 
                "operatingWindow.startDate": { $lte: options.endDate ? new Date(options.endDate) : new Date("2100-01-01") },
                "operatingWindow.endDate": { $gte: options.startDate ? new Date(options.startDate) : new Date("1900-01-01") }
            }
        ];

        if (query.$or) {
            query.$and = [
                { $or: query.$or },
                { $or: dateConditions }
            ];
            delete query.$or;
        } else {
            query.$or = dateConditions;
        }
    }

    const tourDocs = await TourModel.find(query)
        .sort({ createdAt: -1 })
        .limit(options.limit || 10)
        .populate({ path: "heroImage", populate: assetFilePopulate })
        .lean();

    return tourDocs.map((t: any) => ({
        _id: t._id.toString(),
        slug: t.slug,
        title: t.title,
        description: t.summary || t.description || "",
        heroImage: getAssetUrl(t.heroImage),
        priceFrom: t.basePrice?.amount,
        durationDays: t.duration?.days,
        location: t.mainLocation?.address?.city || t.district || t.division || "",
        region: t.mainLocation?.address?.region || t.division || "",
        rating: t.ratings?.average || 0,
        stats: {
            travelers: t.popularityScore || 0,
            reviews: t.ratings?.count || 0,
        },
    }));
}
