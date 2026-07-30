import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongo';
import { TravelArticleModel } from '@/models/articles/travel-article.model';
import { UserModel } from '@/models/user.model';
import { AssetModel } from '@/models/assets/asset.model';
import AssetFileModel from '@/models/assets/asset-file.model';
import { IArticleDetail } from '@/types/article';
import ArticleHero from '../components/ArticleHero';
import ArticleDestinations from '../components/ArticleDestinations';
import ArticleFaqs from '../components/ArticleFaqs';
import ArticleEngagementBar from '../components/ArticleEngagementBar';
import ArticleTableOfContents from '../components/ArticleTableOfContents';
import ArticleComments from '../components/ArticleComments';
import ArticleRelatedPosts from '../components/ArticleRelatedPosts';

// Function to fetch article by slug
async function getArticle(slug: string): Promise<IArticleDetail | null> {
  try {
    await connectToDatabase();

    // Ensure dependent models are registered
    if (!mongoose.models.User) mongoose.model("User", UserModel.schema);
    if (!mongoose.models.Asset) mongoose.model("Asset", AssetModel.schema);
    if (!mongoose.models.AssetFile) mongoose.model("AssetFile", AssetFileModel.schema);

    const articleDoc = await TravelArticleModel.findOne({ slug, status: 'published', deleted: false })
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
      .populate({
        path: 'destinations.imageAsset.assetId',
        select: 'title file',
        populate: {
          path: 'file',
          select: 'publicUrl'
        }
      })
      .lean()
      .exec();

    if (!articleDoc) return null;

    // Map to plain object
    const doc: any = articleDoc;
    
    return {
      _id: doc._id.toString(),
      title: doc.title,
      banglaTitle: doc.banglaTitle,
      slug: doc.slug,
      summary: doc.summary,
      articleType: doc.articleType,
      heroImage: {
        _id: doc.heroImage?._id?.toString() || '',
        url: doc.heroImage?.file?.publicUrl || '',
        title: doc.heroImage?.title || '',
      },
      author: {
        _id: doc.author?._id?.toString() || '',
        name: doc.author?.name || 'Unknown Author',
        avatarUrl: doc.author?.avatar?.file?.publicUrl || '',
        authorBio: doc.authorBio || '',
      },
      categories: doc.categories || [],
      tags: doc.tags || [],
      publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : new Date().toISOString(),
      readingTime: doc.readingTime || 5,
      viewCount: doc.viewCount || 0,
      likeCount: doc.likeCount || 0,
      shareCount: doc.shareCount || 0,
      
      destinations: doc.destinations?.map((dest: any) => ({
        ...dest,
        _id: dest._id?.toString(),
        content: dest.content?.map((c: any) => ({ ...c, _id: c._id?.toString() })),
        foodRecommendations: dest.foodRecommendations?.map((f: any) => ({ ...f, _id: f._id?.toString() })),
        localFestivals: dest.localFestivals?.map((f: any) => ({ ...f, _id: f._id?.toString() })),
        localTips: dest.localTips || [],
        transportOptions: dest.transportOptions || [],
        accommodationTips: dest.accommodationTips || [],
        coordinates: dest.coordinates || null,
        imageAsset: dest.imageAsset ? {
          title: dest.imageAsset.title,
          assetId: {
            _id: dest.imageAsset.assetId?._id?.toString(),
            url: dest.imageAsset.assetId?.file?.publicUrl || '',
            title: dest.imageAsset.assetId?.title || ''
          }
        } : undefined
      })) || [],
      
      seo: doc.seo || { metaTitle: doc.title, metaDescription: doc.summary },
      faqs: doc.faqs?.map((faq: any) => ({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
      })) || [],
      topicTags: doc.topicTags || [],
      allowComments: doc.allowComments ?? true,
    };
  } catch (error) {
    console.error("Error fetching article details:", error);
    return null;
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: article.seo?.metaTitle || `${article.title} | Travel Bangladesh`,
    description: article.seo?.metaDescription || article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: article.heroImage?.url ? [article.heroImage.url] : [],
    }
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-slate-50 min-h-screen pt-32 lg:pt-40 pb-20 relative">

      <ArticleHero article={article} />
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col xl:flex-row gap-8 lg:gap-12 items-start justify-center">
        
        {/* Left Sticky Engagement Bar (Desktop Only) */}
        <aside className="hidden xl:block w-20 flex-shrink-0 sticky top-32 z-30">
          <ArticleEngagementBar 
            articleId={article._id}
            viewCount={article.viewCount}
            likeCount={article.likeCount}
            readingTime={article.readingTime}
            shareCount={article.shareCount}
            articleUrl={`https://yourdomain.com/articles/${article.slug}`}
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl w-full mx-auto xl:mx-0 min-w-0">
          {/* Mobile Engagement Bar */}
          <div className="xl:hidden">
            <ArticleEngagementBar 
              articleId={article._id}
              viewCount={article.viewCount}
              likeCount={article.likeCount}
              readingTime={article.readingTime}
              shareCount={article.shareCount}
              articleUrl={`https://yourdomain.com/articles/${article.slug}`}
            />
          </div>
          {/* Article Summary / Intro */}
        <section className="prose prose-lg prose-emerald max-w-none mb-16">
          <p className="text-xl text-slate-700 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-600 first-letter:mr-2 first-letter:float-left">
            {article.summary}
          </p>
        </section>

        {/* Destinations Loop */}
        {article.destinations && article.destinations.length > 0 && (
          <ArticleDestinations destinations={article.destinations} />
        )}
        
        {/* FAQs */}
        {article.faqs && article.faqs.length > 0 && (
          <ArticleFaqs faqs={article.faqs} />
        )}

        {/* Tags & Categories */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-semibold text-slate-700">Explore more:</span>
            {article.categories.map((cat, i) => (
              <span key={`cat-${i}`} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium uppercase tracking-wider">
                {cat.replace('_', ' ')}
              </span>
            ))}
            {article.tags.map((tag, i) => (
              <span key={`tag-${i}`} className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        {article.author && article.author.authorBio && (
          <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
            {article.author.avatarUrl ? (
              <img src={article.author.avatarUrl} alt={article.author.name} className="w-24 h-24 rounded-full object-cover shadow-sm flex-shrink-0" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-3xl shadow-sm flex-shrink-0">
                {article.author.name.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Written by {article.author.name}</h4>
              <p className="text-slate-600 leading-relaxed">{article.author.authorBio}</p>
            </div>
          </div>
        )}

        {/* Comments Section */}
        {article.allowComments && (
          <ArticleComments articleId={article._id} />
        )}

        {/* Related Posts */}
        <ArticleRelatedPosts currentArticleId={article._id} tags={article.tags} />
        
        </div> {/* End Main Content */}

        {/* Sidebar */}
        {article.destinations && article.destinations.length > 0 && (
          <aside className="hidden xl:block w-80 flex-shrink-0 sticky top-32">
            <ArticleTableOfContents destinations={article.destinations} />
          </aside>
        )}
      </div>
    </main>
  );
}
