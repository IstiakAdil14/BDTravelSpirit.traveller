import React from 'react';
import Image from 'next/image';
import { IArticleDetail } from '@/types/article';
import { Calendar, Clock, Eye, Share2 } from 'lucide-react';

export default function ArticleHero({ article }: { article: IArticleDetail }) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="relative w-full h-[60vh] min-h-[500px] flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {article.heroImage?.url ? (
          <Image 
            src={article.heroImage.url} 
            alt={article.heroImage.title || article.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-slate-300" />
        )}
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 pb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {article.categories?.map((cat) => (
            <span key={cat} className="bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {cat}
            </span>
          ))}
          {article.articleType && (
            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
              {article.articleType.replace('_', ' ')}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
          {article.title}
        </h1>
        {article.banglaTitle && (
          <h2 className="text-2xl md:text-3xl text-emerald-300 font-semibold mb-6">
            {article.banglaTitle}
          </h2>
        )}

        <div className="flex flex-wrap items-center gap-6 mt-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-fit">
          <div className="flex items-center gap-3 pr-6 border-r border-white/20">
            {article.author?.avatarUrl ? (
              <Image 
                src={article.author.avatarUrl} 
                alt={article.author.name} 
                width={48} 
                height={48} 
                className="rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border-2 border-white flex items-center justify-center text-white font-bold text-lg">
                {article.author?.name ? article.author.name.charAt(0).toUpperCase() : 'A'}
              </div>
            )}
            <div>
              <p className="text-white font-semibold text-sm m-0 leading-tight">{article.author?.name || 'Anonymous'}</p>
              <p className="text-slate-300 text-xs m-0 mt-1">Author</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-200 text-sm">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-slate-200 text-sm">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>{article.readingTime || 5} min read</span>
          </div>

          <div className="flex items-center gap-2 text-slate-200 text-sm">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>{article.viewCount || 0} views</span>
          </div>

          <button className="ml-auto flex items-center gap-2 text-slate-200 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-semibold">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
