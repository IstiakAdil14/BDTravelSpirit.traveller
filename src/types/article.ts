export interface IArticleSummary {
  _id: string;
  title: string;
  banglaTitle?: string;
  slug: string;
  summary: string;
  heroImage: {
    _id: string;
    url: string; // Assuming populated URL
    title?: string;
  };
  author: {
    _id: string;
    name: string;
    avatarUrl?: string; // Assuming populated avatar
    authorBio?: string;
  };
  categories: string[];
  tags: string[];
  publishedAt: string;
  readingTime: number;
  viewCount: number;
  likeCount: number;
  shareCount: number;
}

export type ArticleRichTextBlockType = "paragraph" | "heading" | "image" | "link";

export interface IRichTextBlock {
  type: ArticleRichTextBlockType;
  text?: string;
  href?: string;
}

export interface IFoodRecommendation {
  dishName: string;
  description: string;
  bestPlaceToTry?: string;
  approximatePrice?: string;
  spiceLevel?: "none" | "mild" | "medium" | "hot" | "extra_hot";
}

export interface ILocalFestival {
  name: string;
  description: string;
  timeOfYear: string;
  location: string;
  significance?: string;
}

export interface IDestinationBlock {
  _id: string;
  division: string;
  district: string;
  area?: string;
  description: string;
  content: IRichTextBlock[];
  highlights?: string[];
  foodRecommendations?: IFoodRecommendation[];
  localFestivals?: ILocalFestival[];
  localTips?: string[];
  transportOptions?: string[];
  accommodationTips?: string[];
  coordinates?: { lat: number; lng: number };
  imageAsset?: { 
    title: string; 
    assetId: { _id: string; url: string; title?: string }; 
  };
}

export interface IFAQ {
  question: string;
  answer: string;
  category?: "general" | "safety" | "transport" | "accommodation" | "food";
}

export interface IArticleDetail extends IArticleSummary {
  articleType: string;
  destinations?: IDestinationBlock[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage?: string;
  };
  faqs?: IFAQ[];
  topicTags?: string[];
  allowComments: boolean;
}
