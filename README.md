# 🌌 Starlab

> A modern, production-ready **Next.js 15 + TypeScript** starter boilerplate  
> featuring **shadcn/ui**, **Zustand**, **SWR + Axios**, and integrated **auth / toast / API** workflow.

---

## 🚀 Features

### 🧱 Core Stack

- **Next.js 15 (App Router)** — file-based routing & server actions ready
- **TypeScript** — full type safety
- **Tailwind CSS v4** — modern utility-first styling
- **shadcn/ui** — accessible and theme-aware UI primitives
- **Zustand** — lightweight state management with persistence
- **Axios + SWR** — declarative data fetching & caching layer
- **Sonner Toasts** — consistent feedback for loading / success / error

### ⚙️ Dev Experience

- ESLint + Prettier — strict linting & formatting
- Husky + lint-staged — pre-commit type-check & auto-fix
- Zod-based `env.ts` — type-safe environment variables
- Ready-to-deploy folder structure & aliases (`@/components`, `@/lib`, etc.)

---

## 🗂️ Project Structure (kebab-case)

```
src/
├─ app/
│  ├─ (auth)/login/page.tsx
│  ├─ (dashboard)/layout.tsx
│  ├─ (dashboard)/dashboard/page.tsx
│  ├─ api/
│  │  ├─ hello/route.ts
│  │  ├─ boom/route.ts
│  │  └─ me/route.ts
│  └─ page.tsx
│
├─ components/
│  └─ ui/
│     └─ api-demo-buttons.tsx
│
├─ lib/
│  ├─ api.ts
│  ├─ env.ts
│  └─ utils.ts
│
├─ stores/
│  └─ auth.ts
│
└─ types/
   └─ axios-extra.d.ts
```

---

## 🧩 Built-in API Demonstration

| Endpoint         | Description                            | Auth Required |
| ---------------- | -------------------------------------- | ------------- |
| `GET /api/hello` | Returns `{ ok: true }`                 | ❌            |
| `GET /api/boom`  | Always throws 500 for error toast demo | ❌            |
| `GET /api/me`    | Requires `Authorization: Bearer ...`   | ✅            |

> Each endpoint integrates seamlessly with the `useApi()` SWR hook and toast notifications.

---

## 💡 Auth Flow Example

- `/login` — fake login that sets a demo token in Zustand
- `/dashboard` — protected route using layout guard
- `/api/me` — returns mock profile if token exists
- Toasts appear automatically on `Loading`, `Success`, and `Error`

---

## 🧠 Environment Variables

Create `.env.local` from the example:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_APP_NAME=starlab
NEXT_PUBLIC_API_BASE=http://localhost:3000
```

`src/lib/env.ts` uses **zod** to validate these at runtime.

---

## ⚙️ Dev Commands

| Command          | Description             |
| ---------------- | ----------------------- |
| `yarn dev`       | Start local dev server  |
| `yarn build`     | Build production output |
| `yarn start`     | Run built app           |
| `yarn lint`      | Run ESLint              |
| `yarn typecheck` | TypeScript check        |
| `yarn format`    | Prettier format         |
| `yarn prepare`   | Husky install hook      |

---

## 🧹 Git Hooks

Husky runs before commit to ensure clean code:

```bash
npx lint-staged
yarn tsc --noEmit
```

> You can customize pre-commit / pre-push hooks under `.husky/`.

---

## 🪄 Extending the Template

- Add more SWR helpers → `src/lib/hooks/use-api-xxx.ts`
- Replace mock `/api/me` with your real backend
- Connect AWS Cognito, Firebase, or NextAuth.js easily
- Add `confirm-dialog`, `empty-state`, `loading-overlay` using shadcn/ui

---

## 🧭 Naming Convention (kebab-case)

| Type                         | Naming          | Example                                 |
| ---------------------------- | --------------- | --------------------------------------- |
| **Files & Folders**          | `kebab-case`    | `api-demo-buttons.tsx`, `user-card.tsx` |
| **React Components**         | `PascalCase`    | `ApiDemoButtons`, `UserCard`            |
| **Hooks & Utils**            | `camelCase`     | `useApi`, `getEnvValue`                 |
| **Zustand Store Files**      | `kebab-case`    | `auth-store.ts`                         |
| **TypeScript Types / Enums** | `PascalCase`    | `User`, `OrderStatus`                   |
| **Environment Variables**    | Uppercase + `_` | `NEXT_PUBLIC_API_BASE`                  |

---

## 🧑‍💻 Author

**Starlab** — boilerplate by [Yihui Liu](mailto:Yihui.liu1992@gmail.com)  
Built with ❤️ and a love for clean architecture.

---

## 📜 License

MIT — feel free to use, fork, and extend.
