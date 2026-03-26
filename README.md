# GitHub Personal Dashboard

This is a GitHub profile that enables an individual to search any public GitHub profile or log in with your GitHub account to view your personalised dashboard.

---

## Description

This project lets users:

- Search any public GitHub username and view their profile, top languages, recent activity, and contribution calendar.
- Log in via GitHub OAuth to access a personalised dashboard with private repo data.
- Browse search suggestions with debounced input and paginated results.

Some of the things i came across this project that was new to me implementing:

- GitHub OAuth flow with a Vercel serverless function, client secret never exposed to the browser.
- CSRF protection using the state parameter in OAuth
- Global auth state with Zustand and persist middleware
- Data fetching and caching with TanStack Queryy useQuery and useInfiniteQuery
- Runtime API response validation with Zod schemas no any types
- Separation of concerns, API logic in src/api/, hooks in src/hooks/, components

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- Zustand (auth state)
- TanStack Query (data fetching)
- Zod (schema validation)
- react-github-calendar (contribution calendar)
- use-debounce (search suggestions)
- next-themes (dark/light mode)
- Vercel (deployment + serverless functions)

---

## Project Structure

```
src/
├── api/
│   └── github.ts              
│
├── components/
│   ├── dashboard/
│   │   └── RepoGrid.tsx        
│   ├── profile/
│   │   ├── ContributionCalendar.tsx
│   │   ├── ProfileDateLocation.tsx
│   │   ├── ProfileHeader.tsx
│   │   ├── ProfileStats.tsx
│   │   ├── RecentActivity.tsx
│   │   └── TopLanguages.tsx
│   ├── ui/                     
│   ├── FeatureCards.tsx
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   ├── SearchBar.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
│
├── hooks/
│   ├── useSearchResults.ts     
│   └── useSearchUsers.ts       
│
├── pages/
│   ├── CallbackPage.tsx        
│   ├── DashboardPage.tsx      
│   ├── LandingPage.tsx         
│   ├── ProfilePreviewPage.tsx  
│   └── SearchResultsPage.tsx   
│
├── stores/
│   └── authStore.ts            
│
├── App.tsx                    
└── main.tsx                    
```

### Folder Responsibilities

- `api/` - all GitHub rest api calls and zod schemas live here. 
- `components/profile/` — reusable profile components shared between ProfilePreviewPage and DashboardPage. This allowed me to not duplicate components code.
- `components/dashboard/` — dashboard only components that use the auth token for private data.
- `hooks/` — custom hooks that separate query logic from UI, components only receive data and render it.
- `stores/` — zustand auth store persisted to localStorage so sessions survive page refresh
- `pages/` — route level components, composed from smaller components and hooks

---

> Store screenshots in `src/assets/screenshots/`
## Screenshots

### Landing Page
**Desktop**
![Desktop — Landing Page](src/assets/screenshots/desktop-landing.png)

**Mobile**
![Mobile — Landing Page](src/assets/screenshots/mobile-landing.png)

---

### Search Suggestions
**Desktop**
![Desktop — Search Dropdown](src/assets/screenshots/desktop-search-dropdown.png)

**Mobile**
![Mobile — Search Dropdown](src/assets/screenshots/mobile-search-dropdown.png)

---

### Search Results
**Desktop**
![Desktop — Search Results](src/assets/screenshots/desktop-search-results.png)

**Mobile Light mode**
![Mobile — Search Results](src/assets/screenshots/mobile-search-results.png)

---

### Profile Preview
**Desktop**
![Desktop — Profile Preview](src/assets/screenshots/desktop-profile.png)

**Desktop — Contribution Calendar**
![Desktop — Contribution Calendar](src/assets/screenshots/desktop-calendar.png)

**Desktop — Personal Dashboard**
![Desktop — Personal Dashboard ](src/assets/screenshots/desktop-personal-dashboard1.png)

**Desktop — Personal Dashboard**
![Desktop — Personal Dashboard ](src/assets/screenshots/desktop-personal-dashboard2.png)

**Mobile**
![Mobile — Profile Preview](src/assets/screenshots/mobile-profile.png)

**Mobile — Contribution Calendar**
![Mobile — Contribution Calendar](src/assets/screenshots/mobile-calendar.png)

**Mobile — Personal Dashboard**
![Mobile — Personal Dashboard ](src/assets/screenshots/mobile-personal-dashboard1.png)

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/yourUsername/React-Assessment-Sashen.git
```

Navigate into the project:

```bash
cd React-Assessment-Sashen
```

Install dependencies:

```bash
npm install
```

Create a `.env` file at the project root:

```
VITE_GITHUB_CLIENT_ID=your_client_id_here
VITE_REDIRECT_URI=http://localhost:3000/callback
```

Install and run with Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel link
vercel env add GITHUB_CLIENT_ID
vercel env add GITHUB_CLIENT_SECRET
vercel dev
```

Open in your browser:

```
http://localhost:3000
```

Build for production:

```bash
npm run build
npm run preview
```

---

## These are some of the references i used when building up dashboard as well as when something that brought up my my peers when my code was reviewed. This was super helpful.

### GitHub API
- [GitHub OAuth — Authorizing OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [GitHub API — GET /users/:username](https://docs.github.com/en/rest/users/users#get-a-user)
- [GitHub API — GET /user (authenticated)](https://docs.github.com/en/rest/users/users#get-the-authenticated-user)
- [GitHub API — GET /users/:username/repos](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)
- [GitHub API — GET /users/:username/events](https://docs.github.com/en/rest/activity/events#list-events-for-a-user)
- [GitHub API — Search users](https://docs.github.com/en/rest/search/search#search-users)
- [GitHub event types](https://docs.github.com/en/rest/using-the-rest-api/github-event-types)

### State Management & Data Fetching
- [Zustand — getting started](https://zustand.docs.pmnd.rs/learn/getting-started/introduction)
- [Zustand — persist middleware](https://zustand.docs.pmnd.rs/reference/middlewares/persist)
- [TanStack Query — useQuery](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [TanStack Query — useInfiniteQuery](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)
- [TanStack Query — dependent queries](https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries)

### Routing
- [React Router — tutorial](https://reactrouter.com/tutorials/quickstart)
- [React Router — useNavigate](https://reactrouter.com/api/hooks/useNavigate)

### Validation - suggested by by peer to help set up schema's that unable me to implement better and clean schema setups
- [Zod — getting started](https://zod.dev)

### UI & Styling
- [shadcn/ui — components](https://ui.shadcn.com/docs/components)
- [shadcn/ui — dark mode (Vite)](https://ui.shadcn.com/docs/dark-mode/vite)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Lucide icons](https://lucide.dev/icons)
- [react-github-calendar](https://grubersjoe.github.io/react-github-calendar)

### Deployment
- [Vercel — serverless functions](https://vercel.com/docs/functions/runtimes/node-js)
- [Vercel — environment variables](https://vercel.com/docs/projects/environment-variables)
- [Vite — deploying to Vercel](https://vitejs.dev/guide/static-deploy#vercel)

### Browser API
- [window.history.length — MDN](https://developer.mozilla.org/en-US/docs/Web/API/History/length)

---

## What I Learned

- How GitHub OAuthworks end to end authorization code flow, CSRF state parameter, and why the client secret must stay server-side. This was very new but really informative.
- How TanStack Query caches and deduplicates API calls, sharing query keys between components means only one network request.
- How useInfiniteQuery handles paginated APIs cleanly, each page appended to the previous.
- Why Zod schema validation at API boundaries prevents silent failures when external data changes shape.
- Separation of concerns, keeping API logic, state logic, and UI completely separate makes each easier to test and reuse.
- The power of peer reviewing without this some if the functionality implemented would have not been which i'm super grateful for.

---

## Future Improvements

- Faster OAuth callback move user fetch to dashboard mount
- Dashboard top languages derived from authenticated repos
- Unit tests for all components, hooks, and the auth store
