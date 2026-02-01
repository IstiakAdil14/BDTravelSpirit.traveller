import mongoose, { Schema, Document } from 'mongoose';

export interface ITour {
  id: number;
  name: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
}

export interface IStats {
  toursCompleted: number;
  travelersServed: number;
  regionsCovered: number;
  experienceYears: number;
}

export interface ITourOperator extends Document {
  name: string;
  slug: string;
  logo: string;
  rating: number;
  reviewCount: number;
  tagline: string;
  regions: string[];
  stats: IStats;
  services: string[];
  specializations: string[];
  verified: boolean;
  about: string;
  gallery: string[];
  tours: ITour[];
}

const TourSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true }
});

const StatsSchema = new Schema({
  toursCompleted: { type: Number, required: true },
  travelersServed: { type: Number, required: true },
  regionsCovered: { type: Number, required: true },
  experienceYears: { type: Number, required: true }
});

const TourOperatorSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  tagline: { type: String, required: true },
  regions: [{ type: String, required: true }],
  stats: { type: StatsSchema, required: true },
  services: [{ type: String, required: true }],
  specializations: [{ type: String, required: true }],
  verified: { type: Boolean, required: true },
  about: { type: String, required: true },
  gallery: [{ type: String, required: true }],
  tours: [{ type: TourSchema, required: true }]
}, { timestamps: true });

export default mongoose.models.TourOperator || mongoose.model<ITourOperator>('TourOperator', TourOperatorSchema);