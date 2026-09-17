import mongoose from 'mongoose';

/**
 * Connect to MongoDB Atlas
 * Handles connection lifecycle, event listeners, and sanitized status reporting.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.warn('⚠️  MONGODB_URI is not defined in .env. Database connection skipped.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // 5s timeout for fast feedback
    });

    console.log(`✓ MongoDB connected successfully to Atlas (${conn.connection.host})`);
    return true;
  } catch (error) {
    console.error('✕ MongoDB connection error:', error.message || error);
    return false;
  }
}

// Connection lifecycle event listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB connection disconnected.');
});

mongoose.connection.on('reconnected', () => {
  console.log('✓ MongoDB connection re-established.');
});
