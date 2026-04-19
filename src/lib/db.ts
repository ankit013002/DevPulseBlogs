import { MongoClient, Collection, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.CONNECTIONSTRING) {
  throw new Error("Please add your MongoDB URI to the .env file");
}

const uri = process.env.CONNECTIONSTRING;
const options = {};

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db();
}

export async function getCollection<T extends object = object>(
  collectionName: string
): Promise<Collection<T>> {
  const db = await getDatabase();
  return db.collection<T>(collectionName);
}

export default getDatabase;
