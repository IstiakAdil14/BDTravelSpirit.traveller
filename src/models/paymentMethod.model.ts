import { Schema, model, models } from 'mongoose';

export interface IPaymentMethod {
  _id?: string;
  name: string;
  alt: string;
  cloudinaryUrl: string;
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const paymentMethodSchema = new Schema<IPaymentMethod>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  alt: {
    type: String,
    required: true,
  },
  cloudinaryUrl: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export const PaymentMethod = models.PaymentMethod || model<IPaymentMethod>('PaymentMethod', paymentMethodSchema);