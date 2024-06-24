import express from "express";
import bodyParser from "body-parser";
// import axios from "axios";
// import cors from "cors";
// import pg from "pg";
import env from "dotenv";
import { sql } from "@vercel/postgres";

const app = express();
const port = process.env.PORT;
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

// const db = new pg.Client({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   post: 5432,
// });
// db.connect();

app.get("/posts", async (req, res) => {
  try {
    const result =
      await sql`CREATE TABLE IF NOT EXISTS posts ( id SERIAL PRIMARY KEY, title varchar(255), content varchar(255) );`;
    res.status(200);
  } catch (error) {
    res.status(500).json({ error });
  }
  const results = await sql`SELECT * FROM posts`;
  // const result = await db.query("SELECT * FROM posts");
  res.json(results.rows);
});

app.post("/post", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  await sql`INSERT INTO posts(title, content) VALUES (${title}, ${content})`;
  res.status(200).json({ success: true });
});

app.delete("/delete", async (req, res) => {
  const id = req.body[0];

  await sql`DELETE FROM posts WHERE id=${id}`;
  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`server listening on port 4000`);
});
