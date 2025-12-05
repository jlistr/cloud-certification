# Spark Persistence Guide

## Overview

This Cloud Certification Hub now uses **Spark's built-in `useKV` persistence API** instead of external databases. All certification data persists across sessions automatically.

## Why Not Supabase?

Spark runs in a special browser-based runtime that:
- ❌ Cannot connect to external databases (PostgreSQL, MySQL, etc.)
- ❌ Cannot use Edge Functions or serverless backends
- ❌ Cannot access environment variables for API keys
- ❌ Cannot install Node-only packages like `@supabase/supabase-js`

## What You Have Instead

✅ **`spark.kv` - Built-in Key-Value Store**
- Persistent storage that survives page refreshes
- Simple API for storing any JSON-serializable data
- React hooks for reactive updates
- No setup or configuration required

## Current Implementation

### Data Storage

All certifications are stored in the key-value store with the key `certifications-data`:

```typescript
const [certifications, setCertifications] = useKV<Certification[]>(
  'certifications-data',
  DEFAULT_CERTIFICATIONS
)
```

### Available Operations

The `useCertificationsStore` hook provides:

- **`certifications`** - Array of all certification data (reactive)
- **`addCertification(cert)`** - Add a new certification
- **`updateCertification(id, updates)`** - Update an existing certification
- **`deleteCertification(id)`** - Remove a certification
- **`refresh()`** - Reset to default certifications

### Data Persistence

- Data automatically persists across page refreshes
- Changes are immediately saved
- No need to manually call save/sync functions
- Data is scoped to this Spark app

## Using the Spark KV API

### In React Components (Recommended)

```typescript
import { useKV } from '@github/spark/hooks'

// Simple value
const [count, setCount] = useKV('counter', 0)

// Complex object
const [user, setUser] = useKV('user-profile', { name: '', email: '' })

// Array of data
const [items, setItems] = useKV('todo-items', [])

// CRITICAL: Always use functional updates!
setItems((current) => [...(current || []), newItem])
```

### Direct API (Non-React)

```typescript
// Set a value
await spark.kv.set('my-key', { data: 'value' })

// Get a value
const data = await spark.kv.get<MyType>('my-key')

// List all keys
const keys = await spark.kv.keys()

// Delete a key
await spark.kv.delete('my-key')
```

## Important Rules

1. **Always use functional updates** with `useKV` to avoid stale data:
   ```typescript
   // ❌ WRONG - will cause data loss
   setItems([...items, newItem])
   
   // ✅ CORRECT
   setItems((current) => [...(current || []), newItem])
   ```

2. **Handle undefined** - KV can return undefined initially:
   ```typescript
   certifications: certifications || []
   ```

3. **JSON-serializable only** - Can't store functions, classes, or circular references

## Next Steps

You can now:
- Add new certifications that persist
- Edit existing certifications
- Delete certifications
- Build admin panels for managing data
- Add user preferences that persist
- Track user progress through certifications
- Save favorite/bookmarked certifications
