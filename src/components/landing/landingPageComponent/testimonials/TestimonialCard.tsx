import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
    rating: number;
    gradient: string;
  };
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 hover:bg-white transition-all duration-300 shadow-lg w-80 flex-shrink-0 snap-center focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 mt-8 mb-8"
      tabIndex={0}
      role="article"
      aria-label={`Testimonial from ${testimonial.author}, ${testimonial.role}`}
    >
      {/* Quote Icon */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
        className={cn(
          "w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center mb-6",
          testimonial.gradient
        )}
      >
        <Quote className="w-6 h-6 text-white" />
      </motion.div>

      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 mb-8 leading-relaxed italic">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
            {testimonial.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{testimonial.author}</div>
            <div className="text-sm text-gray-600">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
