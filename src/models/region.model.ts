import mongoose, { Schema, models } from "mongoose";

const RegionSchema = new Schema(
{
  name: String,
  image: String,
},
{ timestamps: true }
);

export default models.Region || mongoose.model("Region", RegionSchema);