import express, { Application } from "express";
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";
import { TBlog } from "./types/types";
const app: Application = express();
const client = new MongoClient(process.env.URL as string);
const PORT = process.env.PORT;

// parser
app.use(express.json());

async function main() {
  try {
    const database = client.db("blogs_project");
    const blogsCollection = database.collection("blogs");
    const commentCollection = database.collection("comments");

    // post a blog
    app.post("/create-blogs", async (req, res) => {
      const data = req.body;
      if (Object.entries(data).length < 1) {
        throw new Error("Please input valid type data!");
      }
      const result = await blogsCollection.insertOne(data);
      res.status(200).json(result);
    });
    // get all blogs
    app.get("/blogs", async (req, res) => {
      const result = await blogsCollection.find({}).toArray();
      res.status(200).json(result);
    });
    // update a blog
    app.put("/blogs/:id", async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const updatedData = req.body;
      const result = await blogsCollection.updateOne(filter, {
        $set: updatedData,
      });
      res.status(200).json(result);
    });
    // delete a blog
    app.delete("/blogs/:id", async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const result = await blogsCollection.deleteOne(filter);
      res.status(200).json(result);
    });
    // ========= comment collection ===========

    // post a blog
    app.post("/create-comments", async (req, res) => {
      const data = req.body;
      if (Object.entries(data).length < 1) {
        throw new Error("Please input valid type data!");
      }
      const result = await commentCollection.insertOne(data);
      res.status(200).json(result);
    });
    // get all blogs
    app.get("/comments", async (req, res) => {
      const result = await commentCollection.find({}).toArray();
      res.status(200).json(result);
    });
    // update a blog
    app.put("/comments/:id", async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const updatedData = req.body;
      const result = await commentCollection.updateOne(filter, {
        $set: updatedData,
      });
      res.status(200).json(result);
    });
    // delete a blog
    app.delete("/comments/:id", async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const result = await commentCollection.deleteOne(filter);
      res.status(200).json(result);
    });

    app.get("/", (req, res) => {
      res.send("Hey this is my SERVER API running 🥳");
    });

    app.listen(PORT, () => {
      console.log("The server is running on port", PORT);
    });
  } finally {
    await client.close();
  }
}

main().catch(console.dir);
