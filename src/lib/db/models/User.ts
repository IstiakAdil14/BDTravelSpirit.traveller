import mongoose, { Document, model, models } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string; // optional for OAuth users
  image?: string;
  role?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false, // Make password optional for OAuth users
    },
    image: String,
    role: {
      type: String,
      default: "traveler",
      enum: ["traveler", "guide", "admin"],
    },
    emailVerified: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  const user = this as User & mongoose.Document;

  if (!user.isModified("password") || !user.password) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = models.User || model<User>("User", UserSchema);

export default UserModel;
