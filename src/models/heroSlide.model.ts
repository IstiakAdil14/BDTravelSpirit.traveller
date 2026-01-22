import mongoose, { Schema, Document, models } from "mongoose";

export interface IHeroSlide extends Document {
    image: string;
    title: string;
    subtitle: string;
    alt: string;
    isActive: boolean;
    order: number;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
    {
        image: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        alt: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const HeroSlideModel = models.HeroSlide || mongoose.model<IHeroSlide>("HeroSlide", HeroSlideSchema);
