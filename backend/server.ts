import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import pgPromise, { IDatabase } from "pg-promise"; // combine import

import Routes from "./routes/uploads";

// --- Extend Express Request type for TypeScript ---
declare module "express-serve-static-core" {
  interface Request {
    db?: IDatabase<any>; // now TypeScript knows about req.db
  }
}

// --- Runtime code ---
const app = express();
app.use(cors());
app.use(express.json());

// Initialize pg-promise
const pgp = pgPromise();

// Create database connection

const db = pgp({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
db.connect()
  .then((obj) => {
    console.log("Connected to PostgreSQL DB via pg-promise!");
    obj.done(); // release connection
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

// Make the db available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Mount your uploads router
app.use(Routes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { db };

