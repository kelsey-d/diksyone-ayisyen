# Diksyone Ayisyen - English to Haitian Creole Dictionary

## Project Overview

Diksyone Ayisyen is a modern, interactive English to Haitian Creole dictionary web application built with Next.js 15. The application provides users with word translations, example usage in Haitian Creole poetry, and daily word features to enhance language learning.

**Target Users:** Language learners, educators, and Haitian Creole enthusiasts.

**Primary Features:**

- Real-time word search (English and Creole)
- Translation pairs with contextual examples
- Poetry/literary examples for each word
- Word of the Day feature
- Complete translation library

---

## Tech Stack

### Frontend

- **Framework:** Next.js 15.5.3 (with Turbopack)
- **React:** 19.1.0
- **Styling:** Tailwind CSS + PostCSS
- **UI Components:** Shadcn UI (built on Radix UI primitives)
- **Icons:** Lucide React
- **Theme Management:** Next Themes

### Backend & Database

- **Database:** Supabase (PostgreSQL)
- **Tables:** `poems`, `translations`
- **Status:** Integration in progress

### Development Tools

- **Linting:** ESLint
- **Language:** TypeScript
- **Build Tool:** Turbopack

---

## Project Structure

Following Next.js App Router best practices with organized component architecture:

```
diksyone-ayisyen/
├── public/                      # Static assets
│   └── images/                 # Image files
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes (future)
│   │   ├── layout.tsx         # Root layout with theme provider
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # Reusable React components
│   │   ├── App.tsx            # Main application component
│   │   ├── SearchBar.tsx      # Search input component
│   │   ├── DictionaryEntry.tsx # Word entry display
│   │   ├── TranslationCard.tsx # Translation pair card
│   │   ├── WordOfTheDay.tsx   # Daily word feature
│   │   ├── PoemsSection.tsx   # Poetry examples section
│   │   ├── PoemExample.tsx    # Individual poem display
│   │   ├── ChallengeSection.tsx # Learning challenges
│   │   ├── figma/            # Design system components
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/               # Shadcn UI components library
│   │
│   ├── data/                  # Static data & data management
│   │   └── dictionary-data.ts # Local dictionary entries
│   │
│   ├── lib/                   # Utility functions
│   │   └── utils.ts          # Helper functions & classnames
│   │
│   └── index.tsx
│
├── Configuration Files
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   └── components.json        # Shadcn UI config
│
└── Documentation
    ├── README.md
    └── GEMINI.md (this file)
```

---

## Database Schema

### Tables Overview

The application uses Supabase with two main tables:

#### 1. `translations` table

- `id` (UUID, primary key)
- `english` (text)
- `creole` (text)
- `part_of_speech` (text)
- `pronunciation` (text)
- `example_sentence` (text)
- `poem_id` (text)
- `created_at` (timestamp)

#### 2. `poems` table

- `id` (UUID, primary key)
- `title` (text)
- `author` (text)
- `content` (text)
- `created_at` (timestamp)

---

## Key Components & Features

### Components Architecture

| Component            | Purpose                                           | State                     |
| -------------------- | ------------------------------------------------- | ------------------------- |
| **SearchBar**        | User input for word search                        | Local state (search term) |
| **DictionaryEntry**  | Displays search result with translation & context | Props-based               |
| **TranslationCard**  | Individual translation pair card                  | Props-based               |
| **WordOfTheDay**     | Random word feature & learning starter            | Local/Context state       |
| **PoemsSection**     | Container for poetry examples                     | Props-based               |
| **PoemExample**      | Single poem display with highlighting             | Props-based               |
| **ChallengeSection** | Interactive learning challenges (future)          | Local/Context state       |

### Current Functionality

**Working Features:**

- ✅ Search bar with real-time filtering (case-insensitive)
- ✅ Bilingual search (English & Creole)
- ✅ Word of the Day display (currently random selection)
- ✅ UI component library (Shadcn components)
- ✅ Dark theme support
- ✅ Responsive layout

**Planned Features:**

- 🔜 Supabase integration for poems table
- 🔜 Supabase integration for translations table
- 🔜 API endpoints for CRUD operations
- 🔜 Enhanced poetry examples
- 🔜 Challenge/quiz functionality
- 🔜 User authentication
- 🔜 Favorites/bookmarking system

---

## Development Guidelines

### Running the Project

```bash
# Install dependencies
npm install

# Development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Code Style & Conventions

- **TypeScript:** Strict mode enabled, all components typed
- **Components:** Functional components with hooks
- **Styling:** Tailwind CSS utility classes
- **File Naming:** PascalCase for components, camelCase for utils
- **Component Structure:**
  - Import declarations
  - Type definitions (if complex)
  - Main component function
  - Sub-components (if any)
  - Export statement

### Adding New Features

1. **New Components:** Create in `src/components/` with `.tsx` extension
2. **UI Components:** Use existing Shadcn components or add via `npx shadcn-ui@latest add <component>`
3. **Data:** Update `src/data/dictionary-data.ts` or integrate Supabase queries
4. **Styling:** Use Tailwind CSS classes; avoid inline styles
5. **API Routes:** Create in `src/app/api/<route>/route.ts`

---

## Localization Notes

- **Primary Language:** Haitian Creole (UI text)
- **Secondary Language:** English (dictionary content)
- **Text Direction:** LTR (Left-to-Right)
- **Character Set:** UTF-8 compatible

---

## Future Expansion Areas

- [ ] Advanced search filters (part of speech, context)
- [ ] Audio pronunciation guides
- [ ] User-contributed translations

---

## Notes for AI Coding Agent

**Important Context:**

- All UI components are from Shadcn UI—use these rather than building custom
- Search filtering is case-insensitive and searches both English & Creole fields
- "Word of the Day" currently uses local random selection; should integrate with Supabase when ready
- Haitian Creole text throughout UI—maintain consistent spelling and formatting
- No API routes yet—build these as needed for Supabase operations
- Component hierarchy: App → SearchBar/WordOfTheDay → Results (DictionaryEntry/TranslationCard/PoemsSection)
- Use `useMemo` for expensive operations (filtering has already been optimized)
