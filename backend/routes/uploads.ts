import express from "express";
import { generateUploadUrl } from "../services/S3UploadService";

const router = express.Router();

router.get("/get-upload-url", async (req, res) => {
  try {
    const { fileName, fileType } = req.query as {
      fileName: string;
      fileType: string;
    };

    if (!fileName || !fileType) {
      return res.status(400).json({ error: "Missing fileName or fileType" });
    }

    const data = await generateUploadUrl(fileName, fileType);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
});

export default router;
