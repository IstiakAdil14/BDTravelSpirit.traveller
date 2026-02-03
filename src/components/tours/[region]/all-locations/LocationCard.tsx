import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LocationCard({ location }: { location: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <Link href={`/tours?region=${location.region}&tour=${location.slug}`}>
        <Card className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 hover:border-blue-400/50 hover:shadow-md transition-all">

          {/* IMAGE (REDUCED HEIGHT) */}
          <div className="relative w-[400px] h-[230px] overflow-hidden bg-gray-100">
            <img
              src={location.seo?.ogImage || location.image || '/images/placeholder.jpg'}
              alt={location.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>

          {/* CONTENT */}
          <CardContent className="p-4 space-y-1">

            {/* Title */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {location.name}
              </h3>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">
                {location.region}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-snug line-clamp-2">
              {location.shortDescription}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm pt-1">
              <div className="flex items-center gap-1.5 font-medium text-gray-700">
                <Clock className="w-4 h-4 text-blue-500" />
                {location.duration}
              </div>

              <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-0.5 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-yellow-700">
                  {location.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <div className="text-lg font-black text-gray-900">
                  ৳{location.price.toLocaleString()}
                </div>
                <div className="text-[10px] uppercase font-bold text-gray-500">
                  per person
                </div>
              </div>

              <div className="bg-blue-600 text-white p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>

          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
