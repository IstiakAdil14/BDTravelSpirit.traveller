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

          const user = await UserModel.findOne({ email: credentials.email });

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
          await connectToDatabase();
          const existingUser = await UserModel.findOne({ email: user.email });

          if (existingUser) {
            user.id = existingUser._id?.toString();
            user.role = existingUser.role;
            return true;
          }

          // Create user if they don't exist
          const newUser = await UserModel.create({
            name: user.name,
            email: user.email,
            image: user.image, // Use 'image' field to match schema
            isVerified: true, // Google users are pre-verified
            accountStatus: 'active'
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
