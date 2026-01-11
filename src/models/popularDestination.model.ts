import mongoose, { Schema, Document } from 'mongoose';

export interface IPopularDestination extends Document {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  stats: {
    hotelCount: number;
    avgPrice: number;
    rating: number;
    reviewCount: number;
    popularityScore: number;
  };
  season: {
    bestSeason: string;
    months: string[];
  };
  tags: string[];
  category: string;
  featured: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const PopularDestinationSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  stats: {
    hotelCount: { type: Number, required: true },
    avgPrice: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    popularityScore: { type: Number, required: true }
  },
  season: {
    bestSeason: { type: String, required: true },
    months: [{ type: String, required: true }]
  },
  tags: [{ type: String, required: true }],
  category: { type: String, required: true },
  featured: { type: Boolean, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
}, { timestamps: true });

export default mongoose.models.PopularDestination || mongoose.model<IPopularDestination>('PopularDestination', PopularDestinationSchema);