'use client';

import { Globe, MessageSquare } from 'lucide-react';

export default function TopInfoBar() {
  return (
    // Make this bar transparent so it inherits the header's background
    // (prevents stacking semi-transparent backgrounds which change appearance)
    // Hidden at 709px width and below
    <div className="w-full bg-transparent max-[709px]:hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between px-4 py-2 text-sm text-gray-600 gap-6">

        {/* Item 1: Shop Operators */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>
            Shop <span className="font-medium text-gray-800">20 operators</span>
          </span>
        </div>

        {/* Item 2: Trustpilot */}
        <div className="flex items-center gap-1">
          <span>4.6 stars on</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1">
            ★ Trustpilot
          </span>
          <span className="text-gray-500">(0 reviews)</span>
        </div>

        {/* Item 3: Support */}
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span>24/7 customer support</span>
        </div>

      </div>
    </div>
  );
}
