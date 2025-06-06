import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION
});
const BUCKET = process.env.S3_BUCKET_NAME as string;

export function uploadToStorage(buffer: Buffer, key: string) {
  return s3
    .upload({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ACL: "private"
    })
    .promise();
}

export function downloadFromStorage(key: string) {
  return new Promise<Buffer>((resolve, reject) => {
    s3.getObject({ Bucket: BUCKET, Key: key }, (err, data) => {
      if (err) return reject(err);
      resolve(data.Body as Buffer);
    });
  });
}
