import mongoose, { Schema, Document } from 'mongoose';

export interface ITourLocation extends Document {
  id: string;
  name: string;
  image: string;
  description: string;
  duration: string;
  highlights: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TourLocationSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  highlights: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

export default mongoose.models.TourLocation || mongoose.model<ITourLocation>('TourLocation', TourLocationSchema);