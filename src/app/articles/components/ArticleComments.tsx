"use client";

import { useState, useEffect } from 'react';
import { Send, User, MessageSquareHeart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function ArticleComments({ articleId }: { articleId: string }) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [comments, setComments] = useState<any[]>([]);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const { data: session } = useSession();

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/articles/comments?articleId=${articleId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  useEffect(() => {
    if (articleId) fetchComments();
  }, [articleId, session]); // Refetch on session change to update `hasLiked`

  const handleSubmit = async (e: React.FormEvent, parentId: string | null = null) => {
    e.preventDefault();
    const contentToSubmit = parentId ? replyContent : comment;
    
    if (!contentToSubmit.trim() || !session) return;
    
    if (parentId) setIsSubmittingReply(true);
    else setIsSubmitting(true);

    try {
      const res = await fetch('/api/articles/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, content: contentToSubmit, parentId })
      });
      
      if (res.ok) {
        if (parentId) {
          setReplyContent("");
          setReplyingToId(null);
        } else {
          setComment("");
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to post comment", error);
    } finally {
      setIsSubmitting(false);
      setIsSubmittingReply(false);
    }
  };

  const toggleLike = async (commentId: string, currentHasLiked: boolean) => {
    if (!session) {
      alert("Please sign in to like comments.");
      return;
    }

    // Optimistic UI update
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return { ...c, hasLiked: !currentHasLiked, likes: currentHasLiked ? c.likes - 1 : c.likes + 1 };
      }
      return c;
    }));

    try {
      const res = await fetch('/api/articles/comments/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId })
      });
      if (!res.ok) {
        // Revert on failure
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to toggle like", error);
      fetchComments();
    }
  };

  // Build a tree of comments
  const rootComments = comments.filter(c => !c.parentId);
  const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

  const renderComment = (c: any, isReply = false) => {
    const replies = getReplies(c.id);
    
    return (
      <div key={c.id} className={`flex gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ${isReply ? 'mt-6 relative' : ''}`}>
        
        {/* Thread connector line for replies */}
        {isReply && (
          <div className="absolute -left-8 md:-left-12 top-6 w-6 md:w-8 h-px bg-slate-200" />
        )}

        <div className="flex-shrink-0 z-10">
          {c.avatar ? (
            <Image src={c.avatar} alt={c.author} width={48} height={48} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-sm border-2 border-white" />
          ) : (
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shadow-sm border-2 border-white font-bold">
              {c.author.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 md:p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-bold text-slate-800 truncate pr-2">{c.author}</h5>
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{c.date}</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base break-words">{c.text}</p>
          </div>
          
          <div className="flex items-center gap-4 mt-2 ml-2">
            <button 
              onClick={() => setReplyingToId(replyingToId === c.id ? null : c.id)}
              className="text-xs font-semibold text-slate-400 hover:text-emerald-600 transition-colors"
            >
              {replyingToId === c.id ? 'Cancel Reply' : 'Reply'}
            </button>
            <button 
              onClick={() => toggleLike(c.id, c.hasLiked)}
              className={`text-xs font-semibold transition-colors flex items-center gap-1 ${c.hasLiked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
            >
              <svg className={`w-3.5 h-3.5 ${c.hasLiked ? 'fill-current' : 'fill-none stroke-current stroke-2'}`} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {c.likes}
            </button>
          </div>

          {/* Reply Form */}
          {replyingToId === c.id && (
            <div className="mt-4 mb-6 animate-in fade-in slide-in-from-top-2">
              {!session ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600 mb-3">You must be signed in to reply.</p>
                  <a href="/auth/signin" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors">
                    Sign In
                  </a>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, c.id)}>
                  <div className="relative">
                    <textarea 
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Reply to ${c.author}...`}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 min-h-[80px] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-y text-slate-700 placeholder:text-slate-400"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmittingReply || !replyContent.trim()}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-1.5 px-4 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmittingReply ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      Post Reply
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Render Replies */}
          {replies.length > 0 && (
            <div className="mt-6 border-l-2 border-slate-100 pl-4 md:pl-8 ml-2 md:ml-4 space-y-6">
              {replies.map(reply => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div id="comments-section" className="mt-16 pt-16 border-t border-slate-200 scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquareHeart className="w-8 h-8 text-emerald-500" />
        <h3 className="text-3xl font-bold text-slate-800">Join the Discussion</h3>
      </div>
      
      {/* Main Comment Form */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 mb-12 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 transition-all duration-300 group-hover:w-2" />
        <h4 className="text-lg font-semibold text-slate-700 mb-4">Leave a Reply</h4>
        
        {!session ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
            <p className="text-slate-600 mb-4">You must be signed in to join the discussion.</p>
            <a href="/auth/signin" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Sign In to Comment
            </a>
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, null)}>
            <div className="relative">
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What are your thoughts on this article?"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-y text-slate-700 placeholder:text-slate-400"
                required
              />
              {showSuccess && (
                <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full animate-in fade-in slide-in-from-top-2">
                  Comment posted!
                </div>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button 
                type="submit" 
                disabled={isSubmitting || !comment.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Post Comment
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        <h4 className="text-lg font-semibold text-slate-700">{comments.length} Comments</h4>
        {rootComments.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
            <p className="text-slate-500 font-medium">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          rootComments.map(c => renderComment(c, false))
        )}
      </div>
    </div>
  );
}
