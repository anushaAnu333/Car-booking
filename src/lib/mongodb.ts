import { MongoClient, Db } from "mongodb";
import { config } from "./config";

if (!config.mongodb.uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri = config.mongodb.uri;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (config.app.isDevelopment) {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function to get database
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db("carrental"); // Explicitly use carrental database
}

// Helper function to get a specific collection
export async function getCollection<T extends Record<string, any> = any>(
  collectionName: string
) {
  const db = await getDatabase();
  return db.collection<T>(collectionName);
}
