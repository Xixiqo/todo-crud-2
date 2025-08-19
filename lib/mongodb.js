import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI; // ambil dari .env.local / env Vercel

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB Connected!");
    return client;
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    throw err;
  }
}
