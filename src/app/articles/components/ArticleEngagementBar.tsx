"use client";

import { useState, useEffect } from 'react';
import { Heart, Share2, Eye, Clock, MessageSquare, Twitter, Facebook, Link2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  articleId: string;
  viewCount: number;
  likeCount: number;
  readingTime: number;
  shareCount: number;
  articleUrl: string;
}

export default function ArticleEngagementBar({ articleId, viewCount, likeCount, readingTime, shareCount, articleUrl }: Props) {
  const [likes, setLikes] = useState(likeCount || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id && articleId) {
      fetch(`/api/articles/likes?articleId=${articleId}`)
        .then(res => res.json())
        .then(data => {
          if (data.liked) {
            setHasLiked(true);
          }
        })
        .catch(err => console.error("Failed to fetch like status", err));
    }
  }, [session, articleId]);

  const handleLike = async () => {
    if (!session?.user) {
      alert("Please sign in to like this article.");
      return;
    }
    
    if (isLiking) return;
    setIsLiking(true);

    // Optimistic update
    const previousHasLiked = hasLiked;
    const previousLikes = likes;
    
    setHasLiked(!previousHasLiked);
    setLikes(l => previousHasLiked ? l - 1 : l + 1);

    try {
      const res = await fetch('/api/articles/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId })
      });
      
      const data = await res.json();
      if (!res.ok || !data.success) {
        // Revert on failure
        setHasLiked(previousHasLiked);
        setLikes(previousLikes);
      } else {
        // Sync with server state
        setHasLiked(data.liked);
      }
    } catch (error) {
      console.error("Failed to toggle like", error);
      // Revert on failure
      setHasLiked(previousHasLiked);
      setLikes(previousLikes);
    } finally {
      setIsLiking(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    alert("Link copied to clipboard!");
    setShowShareMenu(false);
  };

  return (
    <div className="relative z-40 mb-8 xl:mb-0 w-full flex justify-center xl:justify-start">
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl xl:shadow-2xl rounded-full xl:rounded-3xl p-2 xl:p-3 flex xl:flex-col items-center gap-2 xl:gap-4 transition-all hover:shadow-emerald-500/10 hover:border-emerald-200/50">
        
        {/* Like Button */}
        <button 
          onClick={handleLike}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all ${hasLiked ? 'bg-rose-50 text-rose-500' : 'hover:bg-slate-100 text-slate-500 hover:text-rose-500'}`}
          title="Like Article"
        >
          <Heart className={`w-5 h-5 mb-0.5 ${hasLiked ? 'fill-current' : ''}`} />
          <span className="text-[10px] font-bold">{likes > 999 ? '1k+' : likes}</span>
        </button>

        {/* Comment Scroll Button */}
        <button 
          onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100 text-slate-500 hover:text-emerald-600 transition-all"
          title="Jump to Comments"
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Chat</span>
        </button>

        <div className="w-px h-8 xl:w-8 xl:h-px bg-slate-200 mx-1 xl:my-1" />

        {/* Views */}
        <div className="hidden xl:flex flex-col items-center justify-center w-12 h-12 text-slate-400" title="Views">
          <Eye className="w-4 h-4 mb-1 opacity-70" />
          <span className="text-[10px] font-medium">{viewCount}</span>
        </div>

        {/* Read Time */}
        <div className="hidden xl:flex flex-col items-center justify-center w-12 h-12 text-slate-400" title="Estimated Reading Time">
          <Clock className="w-4 h-4 mb-1 opacity-70" />
          <span className="text-[10px] font-medium">{readingTime}m</span>
        </div>

        <div className="hidden xl:block w-8 h-px bg-slate-200 my-1" />

        {/* Share Button */}
        <div className="relative">
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all ${showShareMenu ? 'bg-sky-50 text-sky-500' : 'hover:bg-slate-100 text-slate-500 hover:text-sky-500'}`}
            title="Share Article"
          >
            <Share2 className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">{shareCount}</span>
          </button>

          {/* Share Popup */}
          {showShareMenu && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 xl:top-1/2 xl:-translate-y-1/2 xl:left-full xl:-translate-x-0 xl:mt-0 xl:ml-4 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 flex xl:flex-col gap-2 min-w-max animate-in fade-in zoom-in duration-200">
              <button className="p-3 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors" title="Share on Facebook">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-3 hover:bg-sky-50 text-sky-500 rounded-xl transition-colors" title="Share on Twitter">
                <Twitter className="w-5 h-5" />
              </button>
              <button onClick={copyLink} className="p-3 hover:bg-emerald-50 text-emerald-600 rounded-xl transition-colors" title="Copy Link">
                <Link2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
