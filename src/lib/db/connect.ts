// connect.ts
import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URI;

function getMongoUri() {
  if (!MONGODB_URI) {
    MONGODB_URI = process.env.MONGODB_URI;
  }
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }
  return MONGODB_URI;
}

/**
 * Keep a cached connection across hot reloads in development.
 * This prevents creating new connections on every module reload.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var _mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const cached = global._mongooseConnection ?? (global._mongooseConnection = { conn: null, promise: null });

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      // Prevent mongoose from buffering commands if not connected
      bufferCommands: false,
      // Use the new URL parser and unified topology by default in modern mongoose versions
      // (these are defaults in recent versions; keep here for clarity)
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    };

    const mongoUri = getMongoUri();
    cached.promise = mongoose.connect(mongoUri, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
