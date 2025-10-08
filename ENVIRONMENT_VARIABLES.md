# Environment Variables Configuration

## Backend Environment Variables

### Required Variables for Render Deployment

| Variable | Description | Default Value | Required |
|----------|-------------|---------------|----------|
| `NODE_ENV` | Environment mode | `development` | Yes (set to `production`) |
| `PORT` | Port to run the server on | `3003` | Yes |

### Example Render Environment Configuration

In your Render dashboard, set these environment variables:

```
NODE_ENV=production
PORT=3003
```

### How the Backend Handles Environment Variables

1. **PORT**: The server uses `process.env.PORT` if available, otherwise defaults to 3003
2. **NODE_ENV**: Used to determine if running in production or development mode

### Accessing Environment Variables in Code

The backend server automatically reads these environment variables:

```javascript
const PORT = process.env.PORT || 3003;
const NODE_ENV = process.env.NODE_ENV || 'development';
```

### Frontend Environment Variables

For frontend deployment (Vercel/Netlify), set these variables:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT environment variable
2. **CORS errors**: Ensure your frontend URL is in the allowed origins list
3. **Environment variables not loading**: Check that they're set in your deployment platform

### Checking Environment Variables

You can add temporary logging to verify environment variables are loaded:

```javascript
console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
```

**Note**: Never log sensitive information like API keys or secrets.