import Link from 'next/link';
import Image from 'next/image';
import { IArticleSummary } from '@/types/article';

interface ArticleCardProps {
  article: IArticleSummary;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const animationDelay = `${index * 0.1}s`;

  return (
    <Link 
      href={`/articles/${article.slug}`}
      className="group flex flex-col max-w-xs w-full mx-auto bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl overflow-hidden shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:border-emerald-200"
    >
      <div className="relative w-full h-36 overflow-hidden">
        {article.heroImage?.url ? (
          <Image 
            src={article.heroImage.url} 
            alt={article.heroImage.title || article.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-200" />
        )}
        
        {article.categories && article.categories.length > 0 && (
          <div className="absolute top-4 right-4 bg-emerald-500/90 text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            {article.categories[0]}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-base font-bold text-slate-900 mb-1.5 line-clamp-2 leading-tight">
          {article.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2 flex-grow">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {article.author?.avatarUrl ? (
              <Image 
                src={article.author.avatarUrl} 
                alt={article.author.name} 
                width={28} 
                height={28} 
                className="w-7 h-7 rounded-full object-cover bg-slate-200 border border-white shadow-sm" 
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xs border border-white shadow-sm">
                {article.author?.name ? article.author.name.charAt(0).toUpperCase() : 'A'}
              </div>
            )}
            <p className="text-xs font-semibold text-slate-700 m-0">{article.author?.name || 'Anonymous'}</p>
          </div>
          
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>{article.readingTime || 5} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
