import mongoose from 'mongoose';

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGO_URI;

// Check if the MongoDB URI is defined
if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

// Create a cache for the Mongoose connection
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to MongoDB using Mongoose
async function dbConnect() {
    // Check if the connection is already established
    if (cached.conn) {
        return cached.conn;
    }

    // Check if a connection promise is already in progress
    if (!cached.promise) {
        // Set options for Mongoose connection
        const opts = {
            bufferCommands: false,
        };

        // Attempt to connect to MongoDB using Mongoose
        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                console.log(`Successfully connected to MongoDB: ${MONGODB_URI}`);
                return mongoose;
            })
            .catch((error) => {
                console.error(`Error connecting to MongoDB: ${error.message}`);
                throw error;
            });
    }

    // Wait for the connection promise to resolve or reject
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    // Return the established connection
    return cached.conn;
}

// Export the connection function
export default dbConnect;
