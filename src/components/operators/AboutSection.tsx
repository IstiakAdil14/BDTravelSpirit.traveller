'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AboutSectionProps {
  about: string;
}

export default function AboutSection({ about }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortText = about.slice(0, 200) + '...';
  const shouldShowReadMore = about.length > 200;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8">About the Operator</h2>
      <Card>
        <CardContent className="p-8">
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-700 leading-relaxed text-lg">
              {isExpanded ? about : (shouldShowReadMore ? shortText : about)}
            </p>
          </motion.div>
          
          {shouldShowReadMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-emerald-600 hover:text-emerald-700 p-0 h-auto font-medium"
              >
                {isExpanded ? (
                  <>
                    Read less <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}