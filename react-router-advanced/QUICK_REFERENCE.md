# Quick Reference Guide - React Router Advanced

## 🚀 Quick Start
```bash
npm install
npm run dev
# Open http://localhost:5173
```

## 📋 Key Features Overview

### 1. Protected Routes
**File**: `src/components/ProtectedRoute.jsx`
```jsx
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
```
- Wraps routes that require authentication
- Redirects to `/login` if not authenticated
- Preserves intended destination for post-login redirect

### 2. Nested Routes
**File**: `src/pages/Profile.jsx`
```jsx
<Route path="/profile" element={<Profile />}>
  <Route index element={<ProfileOverview />} />
  <Route path="details" element={<ProfileDetails />} />
  <Route path="settings" element={<ProfileSettings />} />
</Route>
```
- Parent component uses `<Outlet />` to render child routes
- Index route (`/profile`) shows default content
- Sub-routes (`/profile/details`, `/profile/settings`) share layout

### 3. Dynamic Routes
**File**: `src/pages/BlogPost.jsx`
```jsx
<Route path="/blog/:id" element={<BlogPost />} />

// In component:
const { id } = useParams();
```
- `:id` is a URL parameter
- Access with `useParams()` hook
- Example URLs: `/blog/1`, `/blog/2`, etc.

### 4. Authentication Context
**File**: `src/contexts/AuthContext.jsx`
```jsx
const { user, login, logout, isAuthenticated } = useAuth();
```
- Global auth state management
- Login: `login(username)`
- Logout: `logout()`
- Check auth: `isAuthenticated()`

## 🗺️ Route Structure

```
/ ........................... Home (public)
/about ...................... About (public)
/login ...................... Login (public)
/blog ....................... Blog list (public)
  └─ /blog/:id .............. Individual post (dynamic, public)
/profile .................... Profile (protected, nested)
  ├─ /profile ............... Overview (index)
  ├─ /profile/details ....... Details (nested)
  └─ /profile/settings ...... Settings (nested)
/* .......................... 404 Not Found (catch-all)
```

## 🎯 Common Patterns

### Navigation
```jsx
import { Link, useNavigate } from 'react-router-dom';

// Declarative navigation
<Link to="/about">About</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/profile');
navigate(-1); // Go back
```

### Route Parameters
```jsx
import { useParams } from 'react-router-dom';

const { id } = useParams(); // From /blog/:id
```

### Conditional Rendering
```jsx
const { isAuthenticated } = useAuth();

{isAuthenticated() ? (
  <Link to="/profile">Profile</Link>
) : (
  <Link to="/login">Login</Link>
)}
```

## 📁 File Organization

```
components/     # Reusable components
  ├─ Navbar.jsx            # Navigation bar
  └─ ProtectedRoute.jsx    # Route guard

contexts/       # Global state
  └─ AuthContext.jsx       # Auth management

pages/          # Page components
  ├─ Home.jsx              # Landing page
  ├─ About.jsx             # About page
  ├─ Login.jsx             # Login form
  ├─ Blog.jsx              # Blog list
  ├─ BlogPost.jsx          # Individual post (dynamic)
  ├─ Profile.jsx           # Profile layout (nested parent)
  ├─ ProfileOverview.jsx   # Profile index
  ├─ ProfileDetails.jsx    # Nested route
  ├─ ProfileSettings.jsx   # Nested route
  └─ NotFound.jsx          # 404 page
```

## 🔧 Core Concepts

### BrowserRouter
Wraps the entire app to enable routing
```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

### Routes & Route
Define route-to-component mappings
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### Link
Navigation without page reload
```jsx
<Link to="/about">About</Link>
```

### useNavigate
Programmatic navigation
```jsx
const navigate = useNavigate();
navigate('/home');
```

### useParams
Access URL parameters
```jsx
const { id } = useParams();
```

### Outlet
Render child routes in nested routing
```jsx
<div>
  <Sidebar />
  <Outlet /> {/* Child routes render here */}
</div>
```

### Navigate
Redirect component
```jsx
<Navigate to="/login" replace />
```

## 🎨 Styling Approach

- Component-specific CSS files
- Shared styles in `ProfileShared.css`
- Global styles in `index.css`
- Dark theme throughout

## 🧪 Testing Quick Checklist

1. ✅ Login without credentials → Stays on login page
2. ✅ Login with username → Redirects to profile
3. ✅ Access profile without login → Redirects to login
4. ✅ Navigate nested routes → URL and content update
5. ✅ Click blog post → Shows individual post
6. ✅ Access invalid route → Shows 404 page
7. ✅ Logout → Clears auth state

## 🔗 Important Hooks

| Hook | Purpose | Example |
|------|---------|---------|
| `useNavigate` | Programmatic navigation | `navigate('/home')` |
| `useParams` | Access URL parameters | `const { id } = useParams()` |
| `useLocation` | Get current location | `const location = useLocation()` |
| `useAuth` | Custom hook for auth | `const { user } = useAuth()` |

## 💡 Tips

1. **Protected Routes**: Always wrap protected content in `<ProtectedRoute>`
2. **Nested Routes**: Use `<Outlet />` in parent component
3. **Dynamic Routes**: Access params with `useParams()`
4. **404 Handling**: Use `path="*"` as last route
5. **Navigation**: Use `<Link>` for declarative, `useNavigate()` for programmatic

## 🚨 Common Gotchas

1. **Auth State Lost on Refresh**: Expected - auth is in-memory only
2. **Nested Routes 404**: Ensure parent route doesn't have exact match
3. **Protected Route Loop**: Use `replace` prop in Navigate to prevent back button issues
4. **Dynamic Route Not Found**: Check parameter name matches `:paramName` in route

## 📚 Further Learning

- React Router Documentation: https://reactrouter.com
- Nested Routes: https://reactrouter.com/en/main/components/outlet
- Protected Routes: https://reactrouter.com/en/main/components/navigate
- Dynamic Routing: https://reactrouter.com/en/main/hooks/use-params

---

**Quick Command Reference**
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```
