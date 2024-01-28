"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
const client = new mongodb_1.MongoClient(process.env.URL);
const PORT = process.env.PORT || 4000;
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const database = client.db("blogs_project");
            const blogsCollection = database.collection("blogs");
            const commentCollection = database.collection("comments");
            // post a blog
            app.post("/create-blogs", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = req.body;
                if (Object.entries(data).length < 1) {
                    throw new Error("Please input valid type data!");
                }
                const result = yield blogsCollection.insertOne(data);
                res.status(200).json(result);
            }));
            // get all blogs
            app.get("/blogs", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield blogsCollection.find({}).toArray();
                res.status(200).json(result);
            }));
            // update a blog
            app.put("/blogs/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const filter = { _id: new mongodb_1.ObjectId(req.params.id) };
                const updatedData = req.body;
                const result = yield blogsCollection.updateOne(filter, {
                    $set: updatedData,
                });
                res.status(200).json(result);
            }));
            // delete a blog
            app.delete("/blogs/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const filter = { _id: new mongodb_1.ObjectId(req.params.id) };
                const result = yield blogsCollection.deleteOne(filter);
                res.status(200).json(result);
            }));
            // ========= comment collection ===========
            // post a blog
            app.post("/create-comments", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = req.body;
                if (Object.entries(data).length < 1) {
                    throw new Error("Please input valid type data!");
                }
                const result = yield commentCollection.insertOne(data);
                res.status(200).json(result);
            }));
            // get all blogs
            app.get("/comments", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield commentCollection.find({}).toArray();
                res.status(200).json(result);
            }));
            // get a comment & blog
            app.get("/comments/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const blogFilter = { _id: new mongodb_1.ObjectId(req.params.id) };
                const commentFilter = { blogId: req.params.id };
                const blog = yield blogsCollection.findOne(blogFilter);
                const comment = yield commentCollection.findOne(commentFilter);
                const commentObj = Object.assign({}, comment);
                commentObj === null || commentObj === void 0 ? true : delete commentObj._id;
                const result = Object.assign(Object.assign({}, blog), commentObj);
                res.status(200).json(result);
            }));
            // update a blog
            app.put("/comments/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const filter = { _id: new mongodb_1.ObjectId(req.params.id) };
                const updatedData = req.body;
                const result = yield commentCollection.updateOne(filter, {
                    $set: updatedData,
                });
                res.status(200).json(result);
            }));
            // delete a blog
            app.delete("/comments/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const filter = { _id: new mongodb_1.ObjectId(req.params.id) };
                const result = yield commentCollection.deleteOne(filter);
                res.status(200).json(result);
            }));
            app.get("/", (req, res) => {
                res.send("Hey this is my SERVER API running 🥳");
            });
            app.listen(PORT, () => {
                console.log("The server is running on port", PORT);
            });
        }
        finally {
            // await client.close();
        }
    });
}
main().catch(console.dir);
