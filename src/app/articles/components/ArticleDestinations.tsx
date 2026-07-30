import React from 'react';
import Image from 'next/image';
import { IDestinationBlock, IRichTextBlock } from '@/types/article';
import { MapPin, Utensils, CalendarHeart, Lightbulb, Bus, Home, Star } from 'lucide-react';

// Renders the rich text blocks (paragraphs, headings, links)
const RichTextContent = ({ content }: { content: IRichTextBlock[] }) => {
  if (!content || content.length === 0) return null;

  return (
    <div className="prose prose-lg prose-slate max-w-none mb-8">
      {content.map((block, idx) => {
        switch (block.type) {
          case 'heading':
            return <h3 key={idx} className="text-2xl font-bold text-slate-800 mt-8 mb-4">{block.text}</h3>;
          case 'paragraph':
            return <p key={idx} className="text-slate-600 leading-relaxed mb-4">{block.text}</p>;
          case 'link':
            return <a key={idx} href={block.href} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-500 font-semibold underline underline-offset-4 decoration-emerald-200 hover:decoration-emerald-500">{block.text}</a>;
          default:
            return <p key={idx}>{block.text}</p>;
        }
      })}
    </div>
  );
};

export default function ArticleDestinations({ destinations }: { destinations: IDestinationBlock[] }) {
  return (
    <div className="space-y-16">
      {destinations.map((dest, index) => (
        <section key={dest._id} className="scroll-mt-24" id={`dest-${dest._id}`}>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {dest.district}, {dest.division}
              </span>
              {dest.area && (
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {dest.area}
                </span>
              )}
              {dest.coordinates && (
                <a 
                  href={`https://maps.google.com/?q=${dest.coordinates.lat},${dest.coordinates.lng}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-sky-100 text-sky-700 hover:bg-sky-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  View on Map
                </a>
              )}
            </div>
          </div>

          {dest.imageAsset?.assetId?.url && (
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-8 shadow-lg">
              <Image 
                src={dest.imageAsset.assetId.url} 
                alt={dest.imageAsset.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}

          <p className="text-xl text-slate-700 font-medium leading-relaxed mb-8 border-l-4 border-emerald-500 pl-6 py-2 bg-gradient-to-r from-emerald-50 to-transparent">
            {dest.description}
          </p>

          <RichTextContent content={dest.content} />

          {/* Highlights */}
          {dest.highlights && dest.highlights.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
              <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> Key Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dest.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Grid for Tips, Transport, Accommodation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {dest.localTips && dest.localTips.length > 0 && (
              <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
                <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-blue-600" /> Local Tips
                </h4>
                <ul className="space-y-2">
                  {dest.localTips.map((tip, i) => (
                    <li key={i} className="text-sm text-blue-800/80 flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {dest.transportOptions && dest.transportOptions.length > 0 && (
              <div className="bg-violet-50/50 rounded-2xl p-5 border border-violet-100">
                <h4 className="font-bold text-violet-900 flex items-center gap-2 mb-3">
                  <Bus className="w-4 h-4 text-violet-600" /> Getting There
                </h4>
                <ul className="space-y-2">
                  {dest.transportOptions.map((opt, i) => (
                    <li key={i} className="text-sm text-violet-800/80 flex items-start gap-2">
                      <span className="text-violet-400 mt-0.5">•</span> {opt}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {dest.accommodationTips && dest.accommodationTips.length > 0 && (
              <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100">
                <h4 className="font-bold text-rose-900 flex items-center gap-2 mb-3">
                  <Home className="w-4 h-4 text-rose-600" /> Where to Stay
                </h4>
                <ul className="space-y-2">
                  {dest.accommodationTips.map((tip, i) => (
                    <li key={i} className="text-sm text-rose-800/80 flex items-start gap-2">
                      <span className="text-rose-400 mt-0.5">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Food Recommendations */}
          {dest.foodRecommendations && dest.foodRecommendations.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Utensils className="w-5 h-5 text-orange-500" /> What to Eat
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dest.foodRecommendations.map((food, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-bold text-slate-800">{food.dishName}</h5>
                      {food.spiceLevel && food.spiceLevel !== 'none' && (
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          food.spiceLevel === 'extra_hot' ? 'bg-red-100 text-red-700' :
                          food.spiceLevel === 'hot' ? 'bg-orange-100 text-orange-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {food.spiceLevel.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{food.description}</p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-50 text-xs text-slate-500 font-medium">
                      <span>{food.bestPlaceToTry || 'Various places'}</span>
                      <span>{food.approximatePrice || 'Varies'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Festivals */}
          {dest.localFestivals && dest.localFestivals.length > 0 && (
            <div className="mb-8 bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-2xl p-6 border border-fuchsia-100">
              <h4 className="text-xl font-bold text-fuchsia-900 flex items-center gap-2 mb-4">
                <CalendarHeart className="w-5 h-5 text-fuchsia-500" /> Local Festivals
              </h4>
              <div className="space-y-4">
                {dest.localFestivals.map((fest, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                      <h5 className="font-bold text-fuchsia-950">{fest.name}</h5>
                      <span className="text-xs font-semibold bg-fuchsia-200 text-fuchsia-800 px-2 py-1 rounded-md">
                        {fest.timeOfYear}
                      </span>
                    </div>
                    <p className="text-sm text-fuchsia-900/70 mb-2">{fest.description}</p>
                    {fest.significance && (
                      <p className="text-xs text-fuchsia-700/60 font-medium flex items-center gap-1 before:content-[''] before:w-1 before:h-1 before:bg-fuchsia-400 before:rounded-full">
                        {fest.significance}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider between destinations */}
          {index < destinations.length - 1 && (
            <hr className="my-16 border-slate-200" />
          )}

        </section>
      ))}
    </div>
  );
}
