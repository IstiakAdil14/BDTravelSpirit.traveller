import mongoose, { Schema, Document } from 'mongoose';

export interface IBangladeshDestination extends Document {
  id: number;
  name: string;
  image: string;
  tourPlaces: number;
}

const BangladeshDestinationSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  tourPlaces: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.models.BangladeshDestination || mongoose.model<IBangladeshDestination>('BangladeshDestination', BangladeshDestinationSchema);