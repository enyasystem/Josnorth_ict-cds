# Environment Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following content:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=https://nyscjosnorth.onrender.com/api
```

## For Local Development

If you're running the backend locally, update the URL:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Important Notes

1. The `.env.local` file is gitignored and should NOT be committed
2. Make sure to restart your dev server after changing environment variables
3. Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser

## Testing the Integration

After setting up the environment variables:

1. Start your dev server: `npm run dev`
2. Open the browser console to see React Query DevTools
3. Check the Network tab to verify API calls are being made to the correct URL
