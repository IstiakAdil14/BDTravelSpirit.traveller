"use client";

import { useEffect, useState } from 'react';
import { IDestinationBlock } from '@/types/article';
import { List } from 'lucide-react';

interface Props {
  destinations: IDestinationBlock[];
}

export default function ArticleTableOfContents({ destinations }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = destinations.map(dest => document.getElementById(`dest-${dest._id}`));
      
      let currentActiveId = "";
      // Find the heading closest to the top of the viewport
      for (const el of headingElements) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // If element top is above the middle of the screen
        if (rect.top <= window.innerHeight / 2) {
          currentActiveId = el.id;
        }
      }
      
      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [destinations, activeId]);

  if (!destinations || destinations.length === 0) return null;

  return (
    <div className="sticky top-32 bg-white/50 backdrop-blur-md rounded-2xl p-6 border border-slate-100 shadow-sm hidden xl:block w-64 max-h-[calc(100vh-10rem)] overflow-y-auto">
      <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
        <List className="w-4 h-4 text-emerald-500" />
        Table of Contents
      </h4>
      <ul className="space-y-3 relative before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-slate-100">
        {destinations.map(dest => {
          const id = `dest-${dest._id}`;
          const isActive = activeId === id;
          return (
            <li key={id} className="relative pl-6">
              <span className={`absolute left-[7.5px] top-2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-emerald-500 scale-150' : 'bg-slate-300'}`} />
              <button 
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`text-sm text-left transition-colors duration-300 ${isActive ? 'text-emerald-700 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {dest.district}{dest.area ? `: ${dest.area}` : ''}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
