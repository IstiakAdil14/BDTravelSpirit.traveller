import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongo';
import { TravelArticleModel } from '@/models/articles/travel-article.model';
import { UserModel } from '@/models/user.model';
import { AssetModel } from '@/models/assets/asset.model';
import AssetFileModel from '@/models/assets/asset-file.model';
import ArticleList from './components/ArticleList';
import { IArticleSummary } from '@/types/article';

export const metadata = {
  title: 'Travel Articles | Discover Bangladesh',
  description: 'Explore the beauty, culture, and destinations of Bangladesh through our carefully curated travel articles.',
};

export const revalidate = 3600; // Revalidate cache every hour

async function getArticles(): Promise<IArticleSummary[]> {
  try {
    await connectToDatabase();
    
    // Ensure dependent models are registered
    if (!mongoose.models.User) mongoose.model("User", UserModel.schema);
    if (!mongoose.models.Asset) mongoose.model("Asset", AssetModel.schema);
    if (!mongoose.models.AssetFile) mongoose.model("AssetFile", AssetFileModel.schema);
    
    // Fetch only published articles and select only the fields needed for the summary
    const articlesDocs = await TravelArticleModel.find({ status: 'published', deleted: false })
      .select('title banglaTitle slug summary heroImage author categories tags publishedAt readingTime viewCount likeCount shareCount')
      .populate({
        path: 'author',
        select: 'name avatar',
        populate: {
          path: 'avatar',
          select: 'file',
          populate: {
            path: 'file',
            select: 'publicUrl'
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
      .sort({ publishedAt: -1 })
      .lean()
      .exec();
      
    // Map to plain objects matching our IArticleSummary interface
    return articlesDocs.map((doc: any) => ({
      _id: doc._id.toString(),
      title: doc.title,
      banglaTitle: doc.banglaTitle,
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
      viewCount: doc.viewCount || 0,
      likeCount: doc.likeCount || 0,
      shareCount: doc.shareCount || 0,
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="pt-32 pb-16 lg:pt-40 px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 pb-2">
          Travel Inspiration
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
          Discover hidden gems, cultural festivals, and the best local cuisines across Bangladesh.
        </p>
      </header>

      <section>
        <ArticleList articles={articles} />
      </section>
    </main>
  );
}
