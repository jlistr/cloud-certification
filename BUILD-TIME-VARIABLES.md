# Build-Time Variable Injection Guide

This guide explains how to inject variables at build time in your Spark application using Vite's built-in features.

## Environment Variables (Recommended)

Vite exposes environment variables prefixed with `VITE_` to your client-side code automatically.

### Setup

1. **Create a `.env` file** in your project root:
```env
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=1.0.0
VITE_FEATURE_FLAG=true
```

2. **Access in your code** using `import.meta.env`:
```typescript
// In any .tsx or .ts file
const apiUrl = import.meta.env.VITE_API_URL
const version = import.meta.env.VITE_APP_VERSION
const featureEnabled = import.meta.env.VITE_FEATURE_FLAG === 'true'

console.log('API URL:', apiUrl)
```

### Environment-Specific Files

You can create different env files for different environments:
- `.env` - Loaded in all cases
- `.env.local` - Loaded in all cases, ignored by git (good for secrets during development)
- `.env.production` - Only loaded in production builds
- `.env.development` - Only loaded in development mode

### Built-in Variables

Vite provides these by default:
- `import.meta.env.MODE` - The mode the app is running in (`'development'` or `'production'`)
- `import.meta.env.DEV` - Boolean, true if in dev mode
- `import.meta.env.PROD` - Boolean, true if in production
- `import.meta.env.BASE_URL` - The base URL the app is being served from

## Using the `define` Option in vite.config.ts

For compile-time constants that don't need environment files, you can use Vite's `define` option:

```typescript
// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify('1.2.3'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    __API_ENDPOINT__: JSON.stringify(process.env.API_URL || 'https://api.default.com'),
  },
  // ... other config
});
```

Then use in your code:
```typescript
declare const __APP_VERSION__: string
declare const __BUILD_DATE__: string
declare const __API_ENDPOINT__: string

console.log('Version:', __APP_VERSION__)
console.log('Built:', __BUILD_DATE__)
console.log('API:', __API_ENDPOINT__)
```

## TypeScript Support

To get proper TypeScript intellisense for your environment variables, create or update `src/vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_VERSION: string
  readonly VITE_FEATURE_FLAG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## Important Notes

⚠️ **Security Warning**: 
- Environment variables prefixed with `VITE_` are exposed to client-side code
- Never put sensitive secrets (API keys, passwords) in `VITE_` variables
- These values will be visible in the built JavaScript bundle

⚠️ **Vite Config Limitation**:
- As noted in your `vite.config.ts`, you should not modify the Vite configuration as it's optimized for the Spark runtime environment
- If you need custom `define` values, they would need to be added carefully to avoid breaking the Spark plugins

## Best Practices

1. **Use `VITE_` prefix** for all environment variables you want accessible in the browser
2. **Use `.env.local`** for local development values (this file should be gitignored)
3. **Document required variables** in a `.env.example` file
4. **Type your env variables** in `vite-env.d.ts` for better DX
5. **Use `import.meta.env`** rather than `process.env` (which is for Node.js only)

## Example: Feature Flags

```typescript
// .env
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_EXPERIMENTAL_UI=false

// src/config.ts
export const config = {
  analytics: {
    enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true'
  },
  features: {
    experimentalUI: import.meta.env.VITE_ENABLE_EXPERIMENTAL_UI === 'true'
  },
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'https://api.default.com'
  }
}

// src/App.tsx
import { config } from './config'

if (config.analytics.enabled) {
  // Initialize analytics
}
```

## For Runtime Configuration

If you need values that change after build (runtime config), use the Spark KV API instead:

```typescript
import { useKV } from '@github/spark/hooks'

// This persists across sessions and can be changed without rebuilding
const [apiUrl, setApiUrl] = useKV('api-url', 'https://api.default.com')
```
