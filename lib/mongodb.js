/* eslint-disable @typescript-eslint/no-require-imports */
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Please define the MONGODB_URI environment variable inside .env.local");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
  try {
    if (!client.topology?.isConnected()) {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("✅ Connected to MongoDB!");
    }
    return client;
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    throw err;
  }
}
