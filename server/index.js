import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
// import cors from "cors";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 4000;
env.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions)); // Use this after the variable declaration

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "posts",
  password: "mariam440",
  post: 5432,
});
db.connect();

app.get("/posts", async (req, res) => {
  const result = await db.query("SELECT * FROM posts");
  res.json(result.rows);
});

app.post("/post", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  await db.query("INSERT INTO posts(title, content) VALUES ($1, $2)", [
    title,
    content,
  ]);
  res.status(200).json({ success: true });
});

app.delete("/delete", async (req, res) => {
  const id = req.body[0];

  await db.query("DELETE FROM posts WHERE id=$1", [id]);
  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
