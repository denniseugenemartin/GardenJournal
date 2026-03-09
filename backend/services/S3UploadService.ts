import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../aws/s3";

export const generateUploadUrl = async (fileName: string, fileType: string) => {
  const bucket = process.env.AWS_S3_BUCKET_NAME || "";
  const key = `images/${fileName}`;

  // Include ACL here if you want public-read access
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: fileType,
  });

  const signedRequest = await getSignedUrl(s3, command, {
    expiresIn: 600, // 10 minutes
  });

  const url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  return {
    signedRequest,
    url,
  };
};
