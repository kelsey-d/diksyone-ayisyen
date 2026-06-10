# Diksyone Ayisyen – Haitian Creole Dictionary

[Live Demo](https://diksyone-ayisyen.vercel.app)

Beginning as a entry in Contra's 2025 Figma Makeathon, I took to my IDE to polish functionality and add more features. Diksyone Ayisyen is now a performant, full-stack web application for translating English to Haitian Creole, featuring poetic example sentences and a focus on speed and accessibility.

## 🚀 Features

- **Fast search**: Sub‑100ms lookups using Supabase queries.
- **AI fallback**: Generates missing entries on demand, including multiple definitions.
- **Responsive UI**: Built with Tailwind CSS and Shadcn UI, accessible on any device.
- **Audio playback**: Listen to poem readings and word pronunciations.

## 📦 Installation

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Improvements

- Caching layer in front of database
- More natural voice for playback
- MEthod to verify AI generated entries
