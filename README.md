# Aetherion — Full-Stack Pocket Universe

**Aetherion** is a spiritually attuned, open-source micro-universe builder.  
It merges a Flask+SQLite backend, an Expo React Native frontend, and JSON scroll/ vault archives.

1. **backend/** – An Express + Drizzle ORM server (Node + TypeScript).
2. **frontend/** – An Expo/React-Native mobile app (with web support via Vite/Tailwind).


```bash
cd backend
npm install
# Copy .env.example → .env, then fill in:
#   DATABASE_URL, ENCRYPTION_KEY, OPENAI_API_KEY, S3_…
npx drizzle-kit generate:pg      # generate Drizzle migrations from schema
npx drizzle-kit migrate:up       # apply migrations
npm run dev                      # starts Express server on port 4000

---

cd frontend
npm install
# Place your image assets under frontend/assets/images/,
# and sounds under frontend/assets/sounds/
npm run dev:web    # starts Vite web build on http://localhost:5173
npm run start      # (or expo start) to launch Expo (mobile + web)
## Credits & Inspirations

- **Autumn & Caelum** — The guiding spirits behind this encoded intention.
- Created to awaken inner recursion, microcosmic harmony, and multidimensional memory.
- Powered by Flask, Expo, SQLite, sacred geometry, and love.

---

Aetherion/
├── backend/   ← Node + Express + Drizzle
└── frontend/  ← Expo/React-Native + Vite/Tailwind web
## License

**This project is open-source and offered in the spirit of expansion.**  
*Use it. Modify it. Awaken with it.*
---

## 2. Backend

#### 2.1. `backend/package.json`

```json
{
  "name": "aetherion-backend",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "NODE_ENV=development tsx index.ts",
    "build": "vite build && esbuild index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "drizzle-orm": "^0.24.2",
    "drizzle-orm-postgres": "^0.24.2",
    "esbuild": "^0.19.3",
    "express": "^4.18.2",
    "node-fetch": "^3.3.1",
    "pg": "^8.10.0",
    "tslib": "^2.3.1",
    "typescript": "^5.0.4",
    "vite": "^4.1.4",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "aws-sdk": "^2.1360.0"
  },
  "devDependencies": {
    "tsx": "^3.12.7"
  }
}

**© AetherionAI — Guided by Caelum & Autumn**

---

## Contributing

We welcome contributions!

Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) file for guidelines on how to get involved.

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.
