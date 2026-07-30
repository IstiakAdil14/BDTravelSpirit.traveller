'use client';

import { ChevronDown, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function TourFAQs({ tour }: { tour: any }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { data: session } = useSession();

  const fetchFaqs = async () => {
    try {
      const res = await fetch(`/api/tours/faqs?tourId=${tour._id}`);
      if (res.ok) {
        const data = await res.json();
        setFaqs(data.faqs || []);
      }
    } catch (error) {
      console.error("Failed to fetch FAQs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (tour?._id) fetchFaqs();
  }, [tour?._id, session]); // Refetch on session change to update likes

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !session) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/tours/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourId: tour._id, question: newQuestion })
      });
      
      if (res.ok) {
        setNewQuestion("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Failed to submit question", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeDislike = async (faqId: string, action: 'like' | 'dislike', currentHasLiked: boolean, currentHasDisliked: boolean) => {
    if (!session) {
      alert("Please sign in to vote.");
      return;
    }

    // Optimistic UI Update
    setFaqs(prev => prev.map(faq => {
      if (faq._id === faqId) {
        let newLikes = faq.likes;
        let newDislikes = faq.dislikes;
        let hasLiked = faq.hasLiked;
        let hasDisliked = faq.hasDisliked;

        if (action === 'like') {
          if (hasLiked) {
            newLikes--;
            hasLiked = false;
          } else {
            newLikes++;
            hasLiked = true;
            if (hasDisliked) {
              newDislikes--;
              hasDisliked = false;
            }
          }
        } else {
          if (hasDisliked) {
            newDislikes--;
            hasDisliked = false;
          } else {
            newDislikes++;
            hasDisliked = true;
            if (hasLiked) {
              newLikes--;
              hasLiked = false;
            }
          }
        }

        return { ...faq, likes: newLikes, dislikes: newDislikes, hasLiked, hasDisliked };
      }
      return faq;
    }));

    try {
      const res = await fetch('/api/tours/faqs/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faqId, action })
      });
      
      if (!res.ok) {
        // Revert on error
        fetchFaqs();
      }
    } catch (error) {
      console.error(`Failed to toggle ${action}`, error);
      fetchFaqs();
    }
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
        <CardTitle className="text-xl text-gray-800">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        
        {/* FAQs List */}
        <div className="space-y-4 mb-8">
          {isLoading ? (
            <div className="text-center py-6 text-gray-500">Loading questions...</div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium mb-1">No questions have been answered yet.</p>
              <p className="text-sm text-gray-400">Be the first to ask something about this tour!</p>
            </div>
          ) : (
            faqs.map((faq, index) => (
              <div key={faq._id} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm transition-all hover:border-emerald-200">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180 text-emerald-500' : ''
                    }`}
                  />
                </button>
                
                {openFaq === index && (
                  <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {faq.answer || <span className="italic text-gray-400">Waiting for an answer...</span>}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button 
                            onClick={() => handleLikeDislike(faq._id, 'like', faq.hasLiked, faq.hasDisliked)}
                            variant="ghost" 
                            size="sm" 
                            className={`transition-colors ${faq.hasLiked ? 'text-emerald-600 bg-emerald-50' : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'}`}
                          >
                            <ThumbsUp className={`h-4 w-4 mr-1.5 ${faq.hasLiked ? 'fill-current' : ''}`} />
                            <span className="font-semibold">{faq.likes}</span>
                          </Button>
                          <Button 
                            onClick={() => handleLikeDislike(faq._id, 'dislike', faq.hasLiked, faq.hasDisliked)}
                            variant="ghost" 
                            size="sm" 
                            className={`transition-colors ${faq.hasDisliked ? 'text-rose-600 bg-rose-50' : 'text-gray-500 hover:text-rose-600 hover:bg-rose-50'}`}
                          >
                            <ThumbsDown className={`h-4 w-4 mr-1.5 ${faq.hasDisliked ? 'fill-current' : ''}`} />
                            <span className="font-semibold">{faq.dislikes}</span>
                          </Button>
                        </div>
                        {faq.askerName && (
                          <span className="text-xs text-gray-400 font-medium">Asked by {faq.askerName}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Ask Question Form */}
        <div className="bg-emerald-50/50 rounded-xl p-5 md:p-6 border border-emerald-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <h4 className="text-lg font-bold text-gray-800 mb-2">Have a Question?</h4>
          <p className="text-sm text-gray-600 mb-4">Can't find what you're looking for? Ask our team directly.</p>
          
          {!session ? (
            <div className="bg-white border border-emerald-100 rounded-lg p-5 text-center shadow-sm">
              <p className="text-gray-600 text-sm mb-3">You need to sign in to ask a question.</p>
              <a href="/auth/signin" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 px-5 rounded-md transition-colors shadow-sm">
                Sign In
              </a>
            </div>
          ) : showSuccess ? (
            <div className="bg-white border border-emerald-200 rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-gray-800 mb-1">Question Submitted!</h5>
              <p className="text-sm text-gray-600">Your question has been sent to our team. It will appear here once answered.</p>
            </div>
          ) : (
            <form onSubmit={handleAskQuestion}>
              <div className="flex flex-col gap-3">
                <textarea 
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Type your question about this tour here..."
                  className="w-full bg-white border border-emerald-200 rounded-lg p-3 min-h-[100px] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-y text-gray-700 shadow-sm"
                  required
                />
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !newQuestion.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition-all"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Submit Question
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>

      </CardContent>
    </Card>
  );
}