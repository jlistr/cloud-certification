# Supabase Integration Guide

This guide explains how to integrate this Cloud Certification Hub with Supabase Edge Functions, PostgreSQL database, and environment variables.

## Overview

The search functionality in `SearchBar.tsx` is designed to eventually call Supabase Edge Functions. This document outlines the integration steps and architecture.

## Architecture

```
User Input → SearchBar Component → Supabase Edge Function → PostgreSQL Query → Return Results
```

## Prerequisites

1. A Supabase project (create one at https://supabase.com)
2. Supabase CLI installed locally
3. Environment variables configured

## Database Schema

### Certifications Table

```sql
-- Create certifications table
CREATE TABLE certifications (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('Microsoft', 'AWS')),
  level TEXT NOT NULL CHECK (level IN ('Foundational', 'Associate', 'Expert', 'Specialty', 'Professional')),
  description TEXT NOT NULL,
  study_guide_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for search performance
CREATE INDEX idx_certifications_provider ON certifications(provider);
CREATE INDEX idx_certifications_level ON certifications(level);
CREATE INDEX idx_certifications_name_trgm ON certifications USING gin(name gin_trgm_ops);
CREATE INDEX idx_certifications_description_trgm ON certifications USING gin(description gin_trgm_ops);

-- Enable trigram extension for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Example Data

```sql
INSERT INTO certifications (id, name, provider, level, description, study_guide_url) VALUES
('AZ-900', 'Microsoft Certified: Azure Fundamentals', 'Microsoft', 'Foundational', 'Validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure.', 'https://learn.microsoft.com/certifications/azure-fundamentals/'),
('AZ-104', 'Microsoft Certified: Azure Administrator Associate', 'Microsoft', 'Associate', 'Validates skills in implementing, managing, and monitoring an organization''s Microsoft Azure environment.', 'https://learn.microsoft.com/certifications/azure-administrator/'),
('SAA-C03', 'AWS Certified Solutions Architect - Associate', 'AWS', 'Associate', 'Validates ability to design and implement distributed systems on AWS.', 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'),
('CLF-C02', 'AWS Certified Cloud Practitioner', 'AWS', 'Foundational', 'Validates overall understanding of the AWS Cloud, independent of specific technical roles.', 'https://aws.amazon.com/certification/certified-cloud-practitioner/');
```

## Supabase Edge Function

### Create the Edge Function

```bash
# Initialize Supabase in your project (if not already done)
supabase init

# Create a new edge function for search
supabase functions new search-certifications
```

### Edge Function Code

File: `supabase/functions/search-certifications/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SearchRequest {
  query: string
  provider?: 'Microsoft' | 'AWS' | 'All'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request body
    const { query, provider = 'All' }: SearchRequest = await req.json()

    // Validate input
    if (query && query.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: 'Search query must be at least 2 characters' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Build query
    let queryBuilder = supabaseClient
      .from('certifications')
      .select('*')

    // Filter by provider if specified
    if (provider !== 'All') {
      queryBuilder = queryBuilder.eq('provider', provider)
    }

    // Apply search filters if query provided
    if (query && query.trim()) {
      const searchTerm = query.trim().toLowerCase()
      
      queryBuilder = queryBuilder.or(
        `id.ilike.%${searchTerm}%,` +
        `name.ilike.%${searchTerm}%,` +
        `level.ilike.%${searchTerm}%,` +
        `description.ilike.%${searchTerm}%`
      )
    }

    // Execute query
    const { data, error } = await queryBuilder.order('name', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to search certifications' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ certifications: data, count: data.length }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
```

### Deploy Edge Function

```bash
# Deploy the function to Supabase
supabase functions deploy search-certifications

# Set up environment variables for the function
supabase secrets set SUPABASE_URL=your-project-url
supabase secrets set SUPABASE_ANON_KEY=your-anon-key
```

## Frontend Integration

### Environment Variables

Create a `.env.local` file in your project root (this file should be in `.gitignore`):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Create Supabase Client

File: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'
import { Certification } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface SearchCertificationsParams {
  query: string
  provider?: 'Microsoft' | 'AWS' | 'All'
}

export interface SearchCertificationsResponse {
  certifications: Certification[]
  count: number
}

export async function searchCertifications({
  query,
  provider = 'All',
}: SearchCertificationsParams): Promise<SearchCertificationsResponse> {
  const { data, error } = await supabase.functions.invoke('search-certifications', {
    body: { query, provider },
  })

  if (error) {
    console.error('Supabase function error:', error)
    throw new Error('Failed to search certifications')
  }

  return data as SearchCertificationsResponse
}

export async function getAllCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Supabase query error:', error)
    throw new Error('Failed to fetch certifications')
  }

  return data as Certification[]
}
```

### Update CertificationsPage Component

File: `src/features/certifications/components/CertificationsPage.tsx`

```typescript
import { useState, useMemo, useCallback, useEffect } from 'react'
import { Certificate } from '@phosphor-icons/react'
import { CertificationGrid } from './CertificationGrid'
import { SearchBar } from '../../../components/SearchBar'
import { CertificationSkeleton } from '../../../components/CertificationSkeleton'
import { Toaster } from '@/components/ui/sonner'
import { CertificationProvider } from '@/lib/types'
import { toast } from 'sonner'
import { searchCertifications, getAllCertifications } from '@/lib/supabase'
import type { Certification } from '@/lib/types'

export function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeProvider, setActiveProvider] = useState<CertificationProvider | 'All'>('All')

  // Load all certifications on mount
  useEffect(() => {
    const loadCertifications = async () => {
      try {
        setIsLoading(true)
        const data = await getAllCertifications()
        setCertifications(data)
      } catch (error) {
        console.error('Failed to load certifications:', error)
        toast.error('Failed to load certifications')
      } finally {
        setIsLoading(false)
      }
    }

    loadCertifications()
  }, [])

  const handleSearch = useCallback(async (query: string, provider: CertificationProvider | 'All') => {
    try {
      setIsLoading(true)
      setSearchQuery(query)
      setActiveProvider(provider)
      
      const { certifications: results, count } = await searchCertifications({
        query,
        provider,
      })
      
      setCertifications(results)
      
      if (query.trim()) {
        toast.success(`Found ${count} certification(s)`)
      }
    } catch (error) {
      console.error('Search failed:', error)
      toast.error('Search failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Certificate size={40} weight="bold" className="text-primary" />
            <h1
              className="text-4xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              Cloud Certification Hub
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover and explore popular cloud certifications from Microsoft Azure and AWS. Find
            the right certification for your career path.
          </p>
          
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search by name, code, or tier..."
          />
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CertificationSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <CertificationGrid certifications={certifications} />
            {certifications.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No certifications found matching "{searchQuery}"
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
```

## Security Considerations

### Row Level Security (RLS)

Enable RLS on the certifications table:

```sql
-- Enable RLS
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create policy for read access (public)
CREATE POLICY "Enable read access for all users" ON certifications
  FOR SELECT
  USING (true);

-- Create policy for insert/update/delete (authenticated users only)
CREATE POLICY "Enable write access for authenticated users" ON certifications
  FOR ALL
  USING (auth.role() = 'authenticated');
```

### Environment Variable Security

- Never commit `.env.local` to version control
- Add `.env.local` to `.gitignore`
- Use Supabase's anon key for client-side operations (it's safe to expose)
- Use service role key only in secure server environments
- Rotate keys if compromised

## Testing

### Test Edge Function Locally

```bash
# Start Supabase locally
supabase start

# Serve functions locally
supabase functions serve search-certifications

# Test with curl
curl -i --location --request POST 'http://localhost:54321/functions/v1/search-certifications' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"query":"azure","provider":"Microsoft"}'
```

### Test in Browser Console

```javascript
// Test the search function
const response = await fetch('https://your-project.supabase.co/functions/v1/search-certifications', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: 'azure',
    provider: 'Microsoft'
  })
})

const data = await response.json()
console.log(data)
```

## Deployment Checklist

- [ ] Database schema created
- [ ] Sample data inserted
- [ ] Edge function created and deployed
- [ ] Environment variables configured in Supabase dashboard
- [ ] RLS policies enabled
- [ ] Frontend environment variables set
- [ ] Supabase client installed
- [ ] Integration code implemented
- [ ] Testing completed
- [ ] Error handling verified

## Monitoring & Logging

- Monitor Edge Function logs in Supabase dashboard
- Set up alerts for function errors
- Track search query performance
- Monitor database query performance with pg_stat_statements

## Cost Optimization

- Add appropriate database indexes for frequently searched fields
- Use connection pooling for database connections
- Implement caching for frequently accessed data
- Monitor and optimize slow queries

## Next Steps

1. Set up Supabase project
2. Run database migrations
3. Deploy edge functions
4. Configure environment variables
5. Update frontend code to use Supabase client
6. Test thoroughly
7. Deploy to production

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Full Text Search](https://www.postgresql.org/docs/current/textsearch.html)
