# React Query Data Fetching Guide

## 📚 Overview

This section demonstrates advanced data fetching and management using **React Query** (@tanstack/react-query), showcasing how to efficiently handle API interactions, caching, and state management in React applications.

## 🎯 What is React Query?

React Query is a powerful data-fetching and state management library that provides:
- **Automatic caching** - Data is cached and reused across components
- **Background refetching** - Keeps data fresh automatically
- **Loading and error states** - Built-in state management
- **Request deduplication** - Prevents duplicate API calls
- **Optimistic updates** - Update UI before server responds
- **DevTools** - Inspect cache and query states

## 🚀 Implementation Details

### Step 1: Installation

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### Step 2: QueryClient Setup

In `App.jsx`, we create a QueryClient and wrap the app with QueryClientProvider:

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your components */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
```

### Step 3: Using useQuery Hook

The `PostsComponent` demonstrates the `useQuery` hook:

```javascript
const { 
  data: posts, 
  isLoading, 
  isError, 
  error, 
  refetch,
  isFetching 
} = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 5000,
  cacheTime: 10 * 60 * 1000,
});
```

**Key Properties:**
- `queryKey`: Unique identifier for the query
- `queryFn`: Function that fetches the data
- `staleTime`: How long data is considered fresh (5 seconds)
- `cacheTime`: How long unused data stays in cache (10 minutes)

## 📡 API Integration

**Endpoint:** `https://jsonplaceholder.typicode.com/posts`

This free REST API provides mock data perfect for testing:
- 100 posts with title, body, userId
- No authentication required
- Reliable and fast responses

## ✨ Key Features Demonstrated

### 1. **Data Fetching**
- Automatic loading states
- Error handling with retry logic
- Success state with data display

### 2. **Caching Behavior**
Navigate between "Form Examples" and "Posts" tabs to see:
- ✅ First load: Network request + loading spinner
- ✅ Navigate away: Data stays in cache
- ✅ Return: Instant load from cache (no spinner!)
- ✅ After 5 seconds: Background refetch if stale

### 3. **Manual Refetch**
Click "Refetch Data" button to:
- Force a fresh API call
- Update cached data
- Show fetching indicator

### 4. **Loading States**
- `isLoading`: True on initial load
- `isFetching`: True whenever fetching (including background)
- Spinner animation during initial load
- "Refreshing..." text during manual refetch

### 5. **Error Handling**
- Automatic error detection
- Retry logic (1 retry by default)
- User-friendly error messages
- "Try Again" button to retry

## 🛠️ React Query DevTools

Click the floating React Query icon (bottom-right) to open DevTools:

**Features:**
- 📊 View all active queries
- 🔍 Inspect query states (fresh, stale, fetching)
- 💾 See cached data
- ⏱️ Monitor refetch behavior
- 🔄 Manually trigger refetch/invalidation

## 🎨 UI Components

### PostsComponent Features
- **Grid Layout**: Responsive card design
- **Post Cards**: Display 20 posts with:
  - Post ID badge
  - Title (capitalized)
  - Body content
  - User badge
- **Info Panel**: Shows total posts and cache demo instructions
- **Refetch Button**: Manually refresh data
- **Fetching Indicator**: Shows when data is being fetched

## 📊 Cache Strategy

```javascript
staleTime: 5000 // 5 seconds
```
- Data is "fresh" for 5 seconds
- No refetch during this time
- After 5s, data is "stale" (still usable, but can refetch)

```javascript
cacheTime: 10 * 60 * 1000 // 10 minutes
```
- Cached data persists for 10 minutes
- Even if component unmounts
- Prevents unnecessary API calls

## 🧪 Testing the Implementation

### Test Caching:
1. Click "Posts (React Query)" tab
2. Wait for data to load (network request)
3. Click "Form Examples" tab
4. Click back to "Posts" tab
5. **Result**: Instant load from cache! 🚀

### Test Refetching:
1. Open Browser DevTools → Network tab
2. Click "Refetch Data" button
3. **Result**: New network request visible
4. Data updates with fresh content

### Test Error Handling:
1. Disconnect internet or modify API URL to invalid
2. **Result**: Error message with "Try Again" button
3. Fix connection and retry
4. **Result**: Successfully loads data

### Observe DevTools:
1. Click React Query DevTools icon
2. Expand "posts" query
3. Watch state changes:
   - `fresh` → `stale` after 5 seconds
   - `inactive` when navigated away
   - `fetching` during refetch

## 🔑 Key Learning Outcomes

✅ **Setup React Query** with QueryClient and Provider  
✅ **Use useQuery hook** for data fetching  
✅ **Implement caching** to reduce API calls  
✅ **Handle loading/error states** gracefully  
✅ **Manual refetch** for on-demand updates  
✅ **Monitor with DevTools** for debugging  
✅ **Configure cache strategies** with staleTime/cacheTime  

## 📈 Performance Benefits

**Without React Query:**
- Every component mount = New API call
- Manual loading/error state management
- No caching = Slower UX
- Complex state synchronization

**With React Query:**
- Smart caching = Fewer API calls
- Automatic state management
- Instant loads from cache
- Built-in error retry logic
- 50-80% reduction in network requests!

## 🔗 Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)

## 💡 Next Steps

Explore more React Query features:
- **Mutations**: Update/delete data with `useMutation`
- **Infinite Queries**: Implement infinite scroll
- **Optimistic Updates**: Update UI before server confirms
- **Query Invalidation**: Force cache refresh
- **Dependent Queries**: Chain API calls
- **Parallel Queries**: Fetch multiple endpoints

---

**Note:** React Query (formerly "react-query") is now part of TanStack and uses the `@tanstack/react-query` package name.
