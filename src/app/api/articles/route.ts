import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import { TravelArticleModel } from '@/models/articles/travel-article.model';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const articles = await TravelArticleModel.find({ status: 'published', deleted: false })
      .select('title slug heroImage categories publishedAt')
      .populate({
        path: 'heroImage',
        select: 'title file',
        populate: {
          path: 'file',
          select: 'publicUrl'
        }
      })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean()
      .exec();

    const mappedArticles = articles.map((doc: any) => ({
      _id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      categories: doc.categories || [],
      heroImage: {
        url: doc.heroImage?.file?.publicUrl || '',
      }
    }));

    return NextResponse.json({ articles: mappedArticles });
  } catch (error) {
    console.error('Error fetching articles API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
