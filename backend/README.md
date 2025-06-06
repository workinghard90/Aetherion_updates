# Aetherion Backend

This service uses Express + Drizzle + OpenAI. Before you run, create a `.env` file:

```env
DATABASE_URL=postgres://user:pass@localhost:5432/aetherion
ENCRYPTION_KEY=32_byte_secret_here
OPENAI_API_KEY=sk-qrst5678qrst5678qrst5678qrst5678qrst5678
S3_ACCESS_KEY=your_s3_access_key
S3_SECRET_KEY=your_s3_secret_key
S3_BUCKET_NAME=your_bucket_name
S3_REGION=your_bucket_region
JWT_SECRET=your_jwt_secret

*bash
npm install
npx drizzle-kit generate:pg
npx drizzle-kit migrate:up
npm run dev

