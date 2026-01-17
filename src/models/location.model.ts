import mongoose, { Schema, models } from "mongoose";


const LocationSchema = new Schema(
{
name: String,
region: String,
image: String,
duration: String,
price: Number,
shortDescription: String,
rating: Number,
},
{ timestamps: true }
);


export default models.Location || mongoose.model("Location", LocationSchema);