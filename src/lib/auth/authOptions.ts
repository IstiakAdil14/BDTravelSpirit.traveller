import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectToDatabase from "@/lib/db/connect";
import UserModel from "@/lib/db/models/User";

// Check for required environment variables
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is required");
}
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn("Google OAuth credentials not set. Google sign-in will not work.");
}

export const authOptions = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
    signIn: "/auth/login",
    error: "/auth/login",
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

    /**
     * On Google sign-in, create user if missing, or sync name/image/emailVerified for existing users.
     * Uses `profile` to detect Google email verification.
     */
    async signIn({ user, account, profile }: any) {
      if (account?.provider === "google") {
        try {
          await connectToDatabase();

          const existingUser = await UserModel.findOne({ email: user.email });

          // Determine if Google marked the email as verified (boolean)
          const googleEmailVerified = Boolean(
            profile?.email_verified ?? (profile && (profile as any).verified_email)
          );

          if (!existingUser) {
            const created = await UserModel.create({
              name: user.name ?? undefined,
              email: user.email,
              image: user.image ?? undefined,
              role: "traveler",
              emailVerified: googleEmailVerified ? new Date() : null,
            });

            if (created && created._id) {
              // ensure subsequent callbacks see the DB id
              user.id = created._id.toString();
            }
          } else {
            // Update only changed fields
            let changed = false;

            if (user.name && user.name !== existingUser.name) {
              existingUser.name = user.name;
              changed = true;
            }

            if (user.image && user.image !== existingUser.image) {
              existingUser.image = user.image;
              changed = true;
            }

            if (googleEmailVerified && !existingUser.emailVerified) {
              existingUser.emailVerified = new Date();
              changed = true;
            }

            if (changed) {
              await existingUser.save();
            }

            // attach DB id to user for jwt/session callbacks
            user.id = existingUser._id?.toString() ?? user.id;
          }
        } catch (error) {
          // Log but don't block sign-in for transient DB errors
          console.error("Google sign in sync error:", error);
        }
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
