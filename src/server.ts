import express from "express";
import { MongoClient } from "mongodb";
import "dotenv/config";
const app = express();
const client = new MongoClient(process.env.URL as string);
const PORT = process.env.PORT;

async function main() {
  try {
    const database = client.db("blogs_project");
    const blogsCollection = database.collection("blogs");
    const commentCollection = database.collection("comments");

    app.post("/blogs", (req, res) => {
      const data = req.body;
      console.log(data);
    });

    app.listen(PORT, () => {
      console.log("The server is running on port", PORT);
    });
  } finally {
    await client.close();
  }
}

main().catch(console.dir);
