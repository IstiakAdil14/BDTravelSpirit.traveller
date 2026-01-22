'use client';

import { ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function TourFAQs({ tour }: { tour: any }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const staticFaqs = [
    {
      _id: '1',
      question: 'What is the best time to visit Cox\'s Bazar?',
      answer: 'The best time to visit Cox\'s Bazar is from November to March when the weather is pleasant and dry.',
      likes: 15,
      dislikes: 2
    },
    {
      _id: '2',
      question: 'Is transportation included in the package?',
      answer: 'Yes, AC bus transportation from Dhaka and local transport in Cox\'s Bazar is included.',
      likes: 12,
      dislikes: 1
    },
    {
      _id: '3',
      question: 'What should I bring for the beach activities?',
      answer: 'Bring sunscreen, swimwear, comfortable walking shoes, and a hat. Beach towels are provided.',
      likes: 8,
      dislikes: 0
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {staticFaqs.map((faq, index) => (
            <div key={faq._id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4">
                  <p className="text-gray-700 mb-3">{faq.answer}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-green-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {faq.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {faq.dislikes}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}