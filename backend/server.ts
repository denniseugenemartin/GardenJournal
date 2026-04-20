import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import pgPromise, { IDatabase } from "pg-promise"; // combine import
import setupGoogleStrategy from "./auth/googleoauth";
import authRoutes from "./routes/auth";

import Routes from "./routes/uploads";

// --- Extend Express Request type for TypeScript ---
declare module "express-serve-static-core" {
  interface Request {
    db?: IDatabase<any>; // now TypeScript knows about req.db
  }
}

// --- Runtime code ---
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
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

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  }),
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Setup Google OAuth strategy
setupGoogleStrategy(db);

app.use("/auth", authRoutes);
app.use(Routes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { db };

