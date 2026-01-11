import mongoose, { Schema, Document } from 'mongoose';

export interface ITourOperator extends Document {
  id: number;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  specialties: string[];
  certified: boolean;
  experience: string;
}

const TourOperatorSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  logo: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  specialties: [{ type: String, required: true }],
  certified: { type: Boolean, required: true },
  experience: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.TourOperator || mongoose.model<ITourOperator>('TourOperator', TourOperatorSchema);