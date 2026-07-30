"use client";

import { useState, useMemo } from 'react';
import { IArticleSummary } from '@/types/article';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles: IArticleSummary[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [selectedAuthor, setSelectedAuthor] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const uniqueAuthors = useMemo(() => {
    if (!articles) return [];
    const authors = new Set<string>();
    articles.forEach(a => {
      if (a.author?.name) {
        authors.add(a.author.name);
      }
    });
    return ["All", ...Array.from(authors)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    setCurrentPage(1); // Reset to first page when filter changes
    if (selectedAuthor === "All") return articles;
    return articles.filter(a => a.author?.name === selectedAuthor);
  }, [articles, selectedAuthor]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center mb-16">
        <h2 className="text-xl text-slate-500 max-w-2xl mx-auto">No articles found at the moment. Check back later!</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      {uniqueAuthors.length > 2 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <span className="text-sm font-semibold text-slate-500 mr-2 uppercase tracking-wider">Filter by Author:</span>
          {uniqueAuthors.map(author => (
            <button
              key={author}
              onClick={() => setSelectedAuthor(author)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedAuthor === author 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              {author}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentArticles.length > 0 ? (
          currentArticles.map((article, index) => (
            <ArticleCard key={article._id} article={article} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-slate-500">No articles found for this author.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-16">
          <button
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="px-6 py-2 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
          >
            Previous
          </button>
          
          <span className="text-sm font-semibold text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => {
              setCurrentPage(p => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className="px-6 py-2 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
