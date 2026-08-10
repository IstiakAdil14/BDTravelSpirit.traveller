import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongo';
import { TravelArticleModel } from '@/models/articles/travel-article.model';
import { UserModel } from '@/models/user.model';
import { AssetModel } from '@/models/assets/asset.model';
import AssetFileModel from '@/models/assets/asset-file.model';
import ArticleCard from './ArticleCard';

interface Props {
  currentArticleId: string;
  tags: string[];
}

export default async function ArticleRelatedPosts({ currentArticleId, tags }: Props) {
  try {
    await connectToDatabase();
    
    // Ensure dependent models are registered
    if (!mongoose.models.User) mongoose.model("User", UserModel.schema);
    if (!mongoose.models.Asset) mongoose.model("Asset", AssetModel.schema);
    if (!mongoose.models.AssetFile) mongoose.model("AssetFile", AssetFileModel.schema);
    
    // Find articles that share at least one tag, excluding the current article
    const relatedDocs = await TravelArticleModel.find({
      _id: { $ne: currentArticleId },
      status: 'published',
      deleted: false,
      tags: { $in: tags }
    })
    .setOptions({ strictPopulate: false })
    .select('title slug summary heroImage author categories tags publishedAt readingTime')
    .populate({
      path: 'author',
      select: 'name avatar',
      strictPopulate: false,
      populate: {
        path: 'avatar',
        select: 'file',
        strictPopulate: false,
        populate: {
          path: 'file',
          select: 'publicUrl',
          strictPopulate: false
        }
      }
    })
    .populate({
      path: 'heroImage',
      select: 'title file',
      populate: {
        path: 'file',
        select: 'publicUrl'
      }
    })
    .limit(3)
    .lean()
    .exec();

    if (!relatedDocs || relatedDocs.length === 0) return null;

    const relatedArticles = relatedDocs.map((doc: any) => ({
      _id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      summary: doc.summary,
      heroImage: {
        _id: doc.heroImage?._id?.toString() || '',
        url: doc.heroImage?.file?.publicUrl || '', 
        title: doc.heroImage?.title || '',
      },
      author: {
        _id: doc.author?._id?.toString() || '',
        name: doc.author?.name || 'Unknown Author',
        avatarUrl: doc.author?.avatar?.file?.publicUrl || '',
      },
      categories: doc.categories || [],
      tags: doc.tags || [],
      publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : new Date().toISOString(),
      readingTime: doc.readingTime || 5,
      viewCount: 0,
      likeCount: 0,
      shareCount: 0,
    }));

    return (
      <div className="mt-16 pt-16 border-t border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-8">You might also like</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((article: any, idx: number) => (
            <ArticleCard key={article._id} article={article} index={idx} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return null;
  }
}
