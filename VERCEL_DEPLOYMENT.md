# Vercel Deployment Configuration

## Environment Variables

For the frontend to connect to the backend, you need to set the following environment variable in Vercel:

### Required Environment Variable

**Variable Name:** `VITE_API_BASE_URL`  
**Value:** `https://e-commerce-backend-4c85.onrender.com`

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (`crazystorefrontend` or your project name)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `https://e-commerce-backend-4c85.onrender.com`
   - **Environment:** Select all (Production, Preview, Development)
6. Click **Save**
7. **Important:** Redeploy your application for the changes to take effect

## Local Development

For local development, create a `.env.local` file in the `eazystore-ui` directory:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Or for production testing locally:

```env
VITE_API_BASE_URL=https://e-commerce-backend-4c85.onrender.com
```

## Verify Configuration

After setting the environment variable and redeploying:

1. Open your Vercel frontend URL
2. Open browser DevTools (F12) → Console
3. Check that API calls are going to: `https://e-commerce-backend-4c85.onrender.com`
4. Verify no CORS errors appear

## Troubleshooting

- **CORS Errors:** Make sure the backend CORS configuration includes your Vercel frontend URL
- **API Not Working:** Verify the environment variable is set correctly in Vercel dashboard
- **Changes Not Reflecting:** Redeploy your Vercel application after setting environment variables

