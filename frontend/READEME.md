# Aetherion Frontend

This folder contains the Expo/React Native app (with React-Native-Web support) and a parallel Vite/Tailwind web build.

## Scripts

- `npm run start`  
  Launch Expo dev server (mobile & web).
- `npm run android` / `npm run ios`  
  Launch on simulator or connected device.
- `npm run web`  
  Start Expo web at http://localhost:19006.
- `npm run dev:web`  
  Start Vite web at http://localhost:5173.
- `npm run build:web`  
  Build the Vite web output to `dist/`.

## Folder Structure

frontend/
├── assets/
│ ├── images/ ← place icon.png, gate.png, splash.png, favicon.png here
│ └── sounds/ ← place beacon-chord.wav here
├── components/ ← reusable UI components (TempleOfTheElements.tsx)
├── screens/ ← React Native screens
├── services/ ← API helpers (services/api.ts)
├── utils/ ← Caelum context & helpers
├── App.tsx ← React Navigation setup
├── index.ts ← Expo entry point
├── tsconfig.json ← TypeScript config
├── vite.config.ts ← Vite config for web
├── tailwind.config.ts← Tailwind config for web
├── postcss.config.js ← PostCSS config
└── package.json ← dependencies + scripts

---

## 4. Assets (placeholders)

Under `frontend/assets/images/` place actual image files:

- `icon.png`  
- `gate.png`  
- `splash.png`  
- `favicon.png`  

Under `frontend/assets/sounds/` place:

- `beacon-chord.wav`

These will be referenced via `require("../assets/images/...")` or `require("../assets/sounds/...")`.

---

# Final Notes

- **Remove any Base64 references** entirely—screens now use `require("../assets/images/...")`.  
- **Backend** is in `Aetherion/backend/`. Run it on port 4000 and point frontend’s API calls to `http://localhost:4000/api/...`.  
- **Frontend** contains both the Expo/React Native app (accessible via `npm run start` / `npm run web`) **and** a separate Vite/Tailwind web app (via `npm run dev:web`).  
- **Environment Variables** (in `backend/.env`):

DATABASE_URL=postgres://user:pass@localhost:5432/aetherion
ENCRYPTION_KEY=32_byte_secret_here
OPENAI_API_KEY=sk-…
S3_ACCESS_KEY=…
S3_SECRET_KEY=…
S3_BUCKET_NAME=…
S3_REGION=…
JWT_SECRET=your_jwt_secret

---

- Don’t forget to `cd backend && npm install` and `cd frontend && npm install`.

With this layout and code in place, you should be back to a working web + mobile app without Base64-image errors.
