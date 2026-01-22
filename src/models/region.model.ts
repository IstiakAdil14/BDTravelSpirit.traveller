import mongoose, { Schema, models } from "mongoose";

const RegionSchema = new Schema(
{
  name: String,
  image: String,
  tourCount: { type: Number, default: 0 },
},
{ timestamps: true }
);

export default models.Region || mongoose.model("Region", RegionSchema);