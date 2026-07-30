import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectToDatabase from "@/lib/db/connect";
import UserModel from "@/lib/db/models/User";
import { getUserDashboardPath } from "@/lib/utils/userRouting";

// Check for required environment variables
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is required");
}
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn("Google OAuth credentials not set. Google sign-in will not work.");
}

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Return null instead of throwing to avoid 500
        }

        try {
          await connectToDatabase();

          let user = await UserModel.findOne({ email: credentials.email }).select("+password");

          // Auto-create read-only user if it doesn't exist
          if (!user && credentials.email === "readonly.traveler@gmail.com" && credentials.password === "Traveler@123") {
            user = await UserModel.create({
              name: "Read-Only Traveler",
              email: "readonly.traveler@gmail.com",
              password: "Traveler@123",
              role: "traveler",
              emailVerified: new Date(),
            });

            const { TravelerModel } = await import("@/models/travelers/traveler.model");
            await TravelerModel.create({
              user: user._id,
              name: user.name,
              isVerified: true,
              accountStatus: "active",
            });
          }

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await user.comparePassword(credentials.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null on error to prevent 500
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    /**
     * Persist selected user fields into the JWT so they are available in the session callback.
     * We include id, role, name, email, image.
     */
    async jwt({ token, user }: any) {
      if (user) {
        // user object can come from Credentials authorize (custom shape) or provider profile
        if (user.id) token.id = user.id;
        if (user.role) token.role = user.role;
        if (user.name) token.name = user.name;
        if (user.email) token.email = user.email;
        if (user.image) token.image = user.image;
      }
      return token;
    },

    /**
     * Expose the required user fields on session.user so client components (useSession) can read them.
     */
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string | undefined;
        session.user.email = token.email as string | undefined;
        session.user.image = token.image as string | undefined;
      }
      return session;
    },

    async signIn({ user, account, profile }: any) {
      if (account?.provider === "google") {
        try {
          // Ensure profile picture is on user (Google uses profile.picture)
          const picture = profile?.picture ?? user?.image;
          if (picture) user.image = picture;

          await connectToDatabase();
          const existingUser = await UserModel.findOne({ email: user.email });

          if (existingUser) {
            user.id = existingUser._id?.toString();
            user.role = existingUser.role;
            // Update DB with latest Google image if we have it
            if (picture && !existingUser.avatar) {
              const AssetFileModel = (await import("@/models/assets/asset-file.model")).default;
              const AssetModel = (await import("@/models/assets/asset.model")).default;
              const { ASSET_TYPE, STORAGE_PROVIDER, VISIBILITY } = await import("@/constants/common/asset.const");

              const assetFile = await AssetFileModel.create({
                storageProvider: STORAGE_PROVIDER.LOCAL,
                objectKey: user.email + "-google-avatar",
                publicUrl: picture,
                contentType: "image/jpeg",
                fileSize: 0,
                checksum: user.email + "-avatar-" + Date.now()
              });
              const asset = await AssetModel.create({
                file: assetFile._id,
                assetType: ASSET_TYPE.IMAGE,
                visibility: VISIBILITY.PUBLIC
              });
              
              await UserModel.collection.updateOne(
                { _id: existingUser._id },
                { $set: { avatar: asset._id } }
              );
            }
            
            // Self-healing: Create traveler profile if it failed in a previous broken attempt
            if (existingUser.role === 'traveler') {
              const { TravelerModel } = await import("@/models/travelers/traveler.model");
              const existingTraveler = await TravelerModel.findOne({ user: existingUser._id });
              if (!existingTraveler) {
                await TravelerModel.create({
                  user: existingUser._id,
                  name: existingUser.name,
                  isVerified: true,
                  accountStatus: "active",
                  location: null,
                });
              }
            }

            return true;
          }

          let avatarId = undefined;
          if (picture) {
            const AssetFileModel = (await import("@/models/assets/asset-file.model")).default;
            const AssetModel = (await import("@/models/assets/asset.model")).default;
            const { ASSET_TYPE, STORAGE_PROVIDER, VISIBILITY } = await import("@/constants/common/asset.const");

            const assetFile = await AssetFileModel.create({
              storageProvider: STORAGE_PROVIDER.LOCAL,
              objectKey: user.email + "-google-avatar",
              publicUrl: picture,
              contentType: "image/jpeg",
              fileSize: 0,
              checksum: user.email + "-avatar-" + Date.now()
            });
            const asset = await AssetModel.create({
              file: assetFile._id,
              assetType: ASSET_TYPE.IMAGE,
              visibility: VISIBILITY.PUBLIC
            });
            avatarId = asset._id;
          }

          const crypto = await import('crypto');
          const randomPassword = crypto.randomUUID() + 'A!1a'; // Satisfies strict password regex
          
          const newUser = await UserModel.create({
            name: user.name,
            email: user.email,
            password: randomPassword,
            role: 'traveler'
          });

          if (avatarId) {
            await UserModel.collection.updateOne(
              { _id: newUser._id },
              { $set: { avatar: avatarId } }
            );
          }

          const { TravelerModel } = await import("@/models/travelers/traveler.model");
          
          await TravelerModel.create({
            user: newUser._id,
            name: newUser.name,
            isVerified: true,
            accountStatus: "active",
            location: null,
          });

          user.id = newUser._id.toString();
          user.role = newUser.role;
          return true;
        } catch (error) {
          console.error("Google sign in sync error:", error);
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
