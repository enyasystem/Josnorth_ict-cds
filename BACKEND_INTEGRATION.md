# Backend Integration with React Query & Context API

## ✅ Implementation Complete

This document outlines the complete backend integration for the NYSC Jos North ICT CDS platform using React Query and Context API.

---

## 📦 Installed Packages

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools axios
```

---

## 📁 New File Structure

```
lib/
├── types/
│   └── api.ts                    # TypeScript types for all API responses
├── api/
│   ├── client.ts                 # Axios client with interceptors
│   ├── auth.ts                   # Authentication endpoints
│   ├── events.ts                 # Events CRUD operations
│   ├── team.ts                   # Team members (devs/excos)
│   ├── resources.ts              # Resources management
│   └── admin.ts                  # Admin dashboard data
└── hooks/
    ├── useEvents.ts              # React Query hooks for events
    ├── useTeam.ts                # React Query hooks for team
    ├── useResources.ts           # React Query hooks for resources
    └── useAdmin.ts               # React Query hooks for admin

contexts/
├── auth-context.tsx              # Authentication state management
└── app-provider.tsx              # Combined providers wrapper

components/
└── providers/
    └── query-provider.tsx        # React Query configuration
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=https://nyscjosnorth.onrender.com/api
```

---

## 🎯 Key Features Implemented

### 1. **API Client (lib/api/client.ts)**

- Axios instance with base URL configuration
- Request interceptor for auth tokens
- Response interceptor for error handling
- Automatic 401 redirect to login
- 30-second timeout for Render.com compatibility

### 2. **Type Safety (lib/types/api.ts)**

Complete TypeScript interfaces for:

- User & Authentication
- Events (with CRUD operations)
- Team Members (Developers & Excos)
- Resources
- Admin Dashboard Stats
- Paginated & API responses

### 3. **React Query Hooks**

#### Events Hooks (lib/hooks/useEvents.ts)

- `useEvents(params)` - Fetch all events with filters
- `useEvent(id)` - Fetch single event
- `useCreateEvent()` - Create new event
- `useUpdateEvent()` - Update event
- `useDeleteEvent()` - Delete event
- `usePublishEvent()` - Publish event

#### Team Hooks (lib/hooks/useTeam.ts)

- `useTeamMembers(type)` - Fetch team members
- `useDevelopers()` - Fetch developers only
- `useExcos()` - Fetch excos only
- `useTeamMember(id)` - Fetch single member
- `useCreateTeamMember()` - Add team member
- `useUpdateTeamMember()` - Update member
- `useDeleteTeamMember()` - Remove member

#### Admin Hooks (lib/hooks/useAdmin.ts)

- `useAdminStats()` - Dashboard statistics
- `useRecentActivities(limit)` - Recent activities (auto-refreshes every 30s)
- `useAnalytics(period)` - Analytics data

### 4. **Authentication Context (contexts/auth-context.tsx)**

- `useAuth()` hook for accessing auth state
- `login(credentials)` - Login with email/password
- `register(data)` - User registration
- `logout()` - Clear session and redirect
- `updateUser(data)` - Update user profile
- Persistent session with localStorage
- Token validation on mount

### 5. **Provider Setup**

- **QueryProvider**: React Query configuration with DevTools
- **AuthProvider**: Authentication state management
- **AppProvider**: Combined wrapper with Toaster

### 6. **Updated Components**

#### EventsSection (components/events-section.tsx)

- ✅ Now fetches from backend API
- ✅ Loading skeletons
- ✅ Error handling
- ✅ Published events only
- ✅ Date formatting

#### TeamSection (components/team-section.tsx)

- ✅ Fetches developers and excos from API
- ✅ Loading states
- ✅ Tab switching between devs/excos
- ✅ Profile modal with email display

#### AdminDashboard (app/admin/page.tsx)

- ✅ Real-time stats from backend
- ✅ Recent activities with auto-refresh
- ✅ Loading skeletons
- ✅ Empty state handling

---

## 🚀 Usage Examples

### Fetching Events in a Component

```tsx
"use client";

import { useEvents } from "@/lib/hooks/useEvents";

export function EventsList() {
  const { data, isLoading, error } = useEvents({
    status: "published",
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading events</div>;

  return (
    <div>
      {data?.data.map((event) => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### Creating an Event

```tsx
"use client";

import { useCreateEvent } from "@/lib/hooks/useEvents";

export function CreateEventForm() {
  const createEvent = useCreateEvent();

  const handleSubmit = (formData) => {
    createEvent.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={createEvent.isPending}>
        {createEvent.isPending ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}
```

### Using Authentication

```tsx
"use client";

import { useAuth } from "@/contexts/auth-context";

export function LoginForm() {
  const { login, isLoading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return <form onSubmit={handleLogin}>...</form>;
}
```

---

## 🔐 Authentication Flow

1. User logs in via `login()` function
2. Token stored in localStorage
3. Token automatically added to all API requests via interceptor
4. On 401 response, user redirected to login
5. Token validated on app mount

---

## 📊 React Query Features

### Automatic Caching

- Data cached for 1 minute (configurable)
- Reduces unnecessary API calls
- Background refetching disabled by default

### Optimistic Updates

- Mutations automatically invalidate related queries
- UI updates immediately with toast notifications

### DevTools

- Available in development mode
- Bottom-right corner of screen
- View all queries, mutations, and cache

---

## 🎨 Loading & Error States

All components now handle:

- ✅ Loading states with Skeleton components
- ✅ Error states with user-friendly messages
- ✅ Empty states when no data available
- ✅ Toast notifications for mutations

---

## 🔄 Data Refresh Patterns

### Manual Refresh

```tsx
const { refetch } = useEvents();
// Call refetch() when needed
```

### Automatic Refresh

```tsx
// Admin activities refresh every 30 seconds
const { data } = useRecentActivities(10);
```

### Invalidate Cache

```tsx
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ["events"] });
```

---

## 🛡️ Error Handling

### API Level

- Axios interceptors catch all errors
- Formatted error objects with message and status code
- Automatic token refresh on 401

### Component Level

- React Query provides `error` object
- Toast notifications for user feedback
- Graceful fallbacks

---

## 📝 Next Steps

### 1. Create `.env.local` file

```bash
NEXT_PUBLIC_API_URL=https://nyscjosnorth.onrender.com/api
```

### 2. Adjust API Types

Review `lib/types/api.ts` and adjust based on your actual backend response structure.

### 3. Test Endpoints

Use React Query DevTools to monitor API calls and responses.

### 4. Add More Features

- Protected routes for admin
- Login/Register pages
- Event detail pages
- Team member profiles
- Resource management

---

## 🐛 Debugging Tips

1. **Check React Query DevTools** - See all queries and their states
2. **Check Network Tab** - Verify API calls are being made
3. **Check Console** - Look for error messages
4. **Verify Environment Variables** - Ensure `NEXT_PUBLIC_API_URL` is set
5. **Check Backend CORS** - Ensure backend allows requests from your frontend

---

## 📚 Additional Resources

- [React Query Docs](https://tanstack.com/query/latest)
- [Axios Docs](https://axios-http.com/)
- [Next.js 14 Docs](https://nextjs.org/docs)

---

## ✨ Summary

Your NYSC Jos North platform now has:

- ✅ Complete backend integration
- ✅ Type-safe API calls
- ✅ Automatic caching and refetching
- ✅ Authentication management
- ✅ Loading and error states
- ✅ Optimistic updates
- ✅ Developer tools for debugging

All components are now connected to your backend at `https://nyscjosnorth.onrender.com/api`! 🚀
