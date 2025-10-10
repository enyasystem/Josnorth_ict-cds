# 🚀 Quick Start Guide

## ✅ Implementation Status: COMPLETE

All backend integration files have been created and the project is ready to use!

---

## 📋 Final Steps (Do This Now!)

### 1. Create Environment File

In your project root, create a file named `.env.local` with this content:

```bash
NEXT_PUBLIC_API_URL=https://nyscjosnorth.onrender.com/api
```

**Windows (PowerShell):**

```powershell
echo "NEXT_PUBLIC_API_URL=https://nyscjosnorth.onrender.com/api" > .env.local
```

**Mac/Linux:**

```bash
echo "NEXT_PUBLIC_API_URL=https://nyscjosnorth.onrender.com/api" > .env.local
```

### 2. Restart Dev Server

Stop the current dev server (Ctrl+C) and restart:

```bash
npm run dev
```

### 3. Test It Out!

Open http://localhost:3000 and:

- ✅ Check Events section loads from API
- ✅ Check Team section loads developers/excos
- ✅ Visit `/admin` to see real-time dashboard
- ✅ Open browser DevTools → Network tab to see API calls
- ✅ Look for React Query DevTools in bottom-right corner

---

## 🎯 What's Working Now

### Home Page (/)

- **Events Section** → Fetches from `/api/events`
- **Team Section** → Fetches from `/api/team/developers` and `/api/team/excos`

### Admin Dashboard (/admin)

- **Stats Cards** → Fetches from `/api/admin/stats`
- **Recent Activities** → Fetches from `/api/admin/activities` (auto-refreshes every 30s)

---

## 📊 React Query DevTools

After starting the dev server, you'll see a small icon in the **bottom-right corner** of your browser.

Click it to open DevTools and see:

- All active queries
- Query status (loading, success, error)
- Cached data
- Refetch triggers

---

## 🔍 Verify Everything Works

### Check 1: API Calls

1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload the page
4. You should see calls to:
   - `https://nyscjosnorth.onrender.com/api/events`
   - `https://nyscjosnorth.onrender.com/api/team/developers`
   - `https://nyscjosnorth.onrender.com/api/team/excos`

### Check 2: React Query

1. Look for React Query DevTools in bottom-right
2. Click to open
3. You should see queries like:
   - `['events', { status: 'published', limit: 6 }]`
   - `['team', 'developers']`
   - `['team', 'excos']`

### Check 3: Data Loading

- You should see **skeleton loaders** briefly while data loads
- Then actual data from your backend should appear
- If backend is down, you'll see error messages

---

## 🎨 Usage Examples

### Using Events Hook

```tsx
"use client";

import { useEvents } from "@/lib/hooks/useEvents";

export function MyComponent() {
  const { data, isLoading, error } = useEvents({
    status: "published",
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      {data?.data.map((event) => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### Using Auth Context

```tsx
"use client";

import { useAuth } from "@/contexts/auth-context";

export function LoginButton() {
  const { login, user, logout } = useAuth();

  const handleLogin = async () => {
    await login({
      email: "user@example.com",
      password: "password",
    });
  };

  return user ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
}
```

---

## 🐛 Troubleshooting

### Problem: "Failed to load events"

**Solution:**

1. Check `.env.local` file exists
2. Verify API URL is correct
3. Ensure backend is running
4. Check browser console for errors

### Problem: CORS Error

**Solution:**
Your backend needs to allow requests from `http://localhost:3000`

Add to your backend CORS config:

```python
# Django example
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://your-frontend-domain.com"
]
```

### Problem: 401 Unauthorized

**Solution:**

1. Open browser console
2. Type: `localStorage.clear()`
3. Reload page
4. Try logging in again

---

## 📁 File Structure Created

```
✅ lib/
   ├── types/api.ts
   ├── api/
   │   ├── client.ts
   │   ├── auth.ts
   │   ├── events.ts
   │   ├── team.ts
   │   ├── resources.ts
   │   └── admin.ts
   └── hooks/
       ├── useEvents.ts
       ├── useTeam.ts
       ├── useResources.ts
       └── useAdmin.ts

✅ contexts/
   ├── auth-context.tsx
   └── app-provider.tsx

✅ components/providers/
   └── query-provider.tsx

✅ Documentation:
   ├── BACKEND_INTEGRATION.md
   ├── ENV_SETUP.md
   ├── IMPLEMENTATION_SUMMARY.md
   └── QUICK_START.md (this file)
```

---

## 🎯 Next Recommended Steps

1. **Create `.env.local`** ← Do this now!
2. Test the integration with your backend
3. Adjust API types in `lib/types/api.ts` if needed
4. Create login/register pages
5. Add protected routes for admin
6. Build more features using the hooks!

---

## 📚 More Help

- **Detailed Guide**: See `BACKEND_INTEGRATION.md`
- **Environment Setup**: See `ENV_SETUP.md`
- **Complete Summary**: See `IMPLEMENTATION_SUMMARY.md`

---

## ✨ You're Ready to Go!

Just create the `.env.local` file and start building! 🚀

**Questions?** Check the documentation files or open React Query DevTools to debug.
