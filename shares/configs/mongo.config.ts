import { MongoClient } from "mongodb";
import "dotenv/config";

const URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DATABASE_NAME = process.env.DATABASE_NAME || "mydb";

export async function connect(uri = URI, dbName = DATABASE_NAME) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    throw new Error("Error connecting to the database");
  }
}

export async function close(client: MongoClient) {
  await client.close();
}

export default { connect, close };