import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { 
    conn: null, 
    promise: null,
    lastFailedAt: 0,
    cooldownMs: 30000 // 30s cooldown before retrying an offline database
  };
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  // Circuit breaker: If MongoDB recently failed to connect (e.g. offline dev server),
  // skip the blocking connection timeout immediately so fallback data serves in 0ms.
  const now = Date.now();
  if (cached.lastFailedAt && (now - cached.lastFailedAt < cached.cooldownMs)) {
    throw new Error('MongoDB unreachable: circuit breaker open');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1000,
      connectTimeoutMS: 1000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      cached.lastFailedAt = 0;
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null;
      cached.lastFailedAt = Date.now();
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    cached.lastFailedAt = Date.now();
    throw err;
  }
}

export default connectDB;
