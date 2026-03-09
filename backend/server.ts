// backend/server.ts
import dotenv from "dotenv";
dotenv.config();

import express = require("express");
import cors = require("cors");
import AWS = require("aws-sdk");

// Import the uploads router
import Routes from "./routes/uploads"; // <-- make sure this file exists

const app = express();
app.use(cors());
app.use(express.json());

// Mount the uploads router at /uploads
app.use(Routes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
