# Application Flow Diagram

## 🗺️ Navigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                          NAVBAR (Always Visible)                 │
│  [React Router Advanced] Home | About | Blog | Profile | Login  │
└─────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
              Not Authenticated          Authenticated
                    │                           │
        ┌───────────┴───────────┐     ┌────────┴─────────┐
        │                       │     │                  │
    [Login]  [Profile] ──────► Login  [Logout Button]   │
                                      [Profile Accessible]
```

---

## 🏠 Route Structure

```
Application Root (/)
│
├── 📄 Home Page (/)
│   └── Public - Welcome message & feature cards
│
├── 📄 About Page (/about)
│   └── Public - Project information
│
├── 🔐 Login Page (/login)
│   └── Public - Authentication form
│
├── 📝 Blog Section (/blog)
│   ├── Blog List (/blog) - Public
│   │   └── Shows all blog posts
│   │
│   └── Blog Post (/blog/:id) - Public, Dynamic
│       ├── /blog/1 - "Getting Started with React Router"
│       ├── /blog/2 - "Advanced Routing Patterns"
│       ├── /blog/3 - "Authentication in React"
│       ├── /blog/4 - "React Performance Optimization"
│       └── /blog/999 - "Post Not Found"
│
├── 👤 Profile Section (/profile) - Protected, Nested
│   │   ⚠️  Requires Authentication
│   │
│   ├── Overview (/profile) - Index Route
│   │   └── Account info & quick stats
│   │
│   ├── Details (/profile/details) - Nested Route
│   │   └── Personal info, bio, skills
│   │
│   └── Settings (/profile/settings) - Nested Route
│       └── Preferences & notifications
│
└── ❌ 404 Not Found (*)
    └── Catch-all for invalid routes
```

---

## 🔄 User Journey Examples

### Journey 1: First-Time Visitor
```
1. Land on Home (/) 
   ↓
2. Click "Blog" in navbar
   ↓
3. Navigate to Blog (/blog)
   ↓
4. Click on a blog post
   ↓
5. View Blog Post (/blog/2)
   ↓
6. Click "Back to Blog"
   ↓
7. Return to Blog (/blog)
```

### Journey 2: Login & Access Protected Content
```
1. Click "Profile" (not authenticated)
   ↓
2. Auto-redirect to Login (/login)
   ↓
3. Enter username "Alice"
   ↓
4. Submit form
   ↓
5. Redirect to Profile (/profile)
   ↓
6. View Profile Overview
   ↓
7. Click "Profile Details" in sidebar
   ↓
8. Navigate to /profile/details (nested route)
   ↓
9. Click "Settings" in sidebar
   ↓
10. Navigate to /profile/settings (nested route)
```

### Journey 3: Logout Flow
```
1. User authenticated, viewing Profile
   ↓
2. Click "Logout (Alice)" button
   ↓
3. Auth state cleared
   ↓
4. Navbar updates (Profile → Login)
   ↓
5. Try to access /profile again
   ↓
6. Auto-redirect to Login (/login)
```

---

## 🔐 Authentication Flow

```
┌─────────────┐
│ Start: User │
│ Not Logged  │
│     In      │
└──────┬──────┘
       │
       ├──► Try Access /profile
       │         │
       │         ↓
       │    ProtectedRoute Check
       │         │
       │    ┌────┴────┐
       │    │ Auth?   │
       │    └────┬────┘
       │         │ NO
       │         ↓
       │    Navigate to /login
       │         │
       ├─────────┘
       │
       ↓
  ┌─────────────┐
  │ Login Page  │
  │ Enter Name  │
  └──────┬──────┘
         │
         ↓
    login(username)
         │
         ↓
  ┌──────────────┐
  │ AuthContext  │
  │ setUser()    │
  └──────┬───────┘
         │
         ↓
  Navigate to /profile
         │
         ↓
  ┌──────────────┐
  │ Profile Page │
  │ Accessible!  │
  └──────────────┘
```

---

## 🗂️ Nested Routes Structure

```
/profile (Profile.jsx - Parent Component)
│
├── Layout Structure:
│   ├── Welcome Message
│   ├── Sidebar Navigation
│   │   ├── [Overview] ──────────┐
│   │   ├── [Profile Details]    │
│   │   └── [Settings]           │
│   │                             │
│   └── Content Area              │
│       └── <Outlet /> ←──────────┘ Renders child route here
│
└── Child Routes:
    ├── Index Route (/profile)
    │   └── ProfileOverview.jsx
    │       └── Account info, stats
    │
    ├── Details Route (/profile/details)
    │   └── ProfileDetails.jsx
    │       └── Personal info, bio, skills
    │
    └── Settings Route (/profile/settings)
        └── ProfileSettings.jsx
            └── Notification & privacy settings
```

---

## 🎯 Dynamic Route Example

```
Blog List Page (/blog)
│
├── Blog Post Card 1
│   Title: "Getting Started with React Router"
│   <Link to="/blog/1"> ─────────┐
│                                 │
├── Blog Post Card 2              │
│   Title: "Advanced Routing"    │
│   <Link to="/blog/2"> ────┐    │
│                            │    │
├── Blog Post Card 3         │    │
│   <Link to="/blog/3">      │    │
│                            │    │
└── Blog Post Card 4         │    │
    <Link to="/blog/4">      │    │
                             │    │
    ┌────────────────────────┘    │
    │                             │
    ↓                             ↓
BlogPost Component            BlogPost Component
(/blog/2)                     (/blog/1)
│                             │
useParams() → { id: "2" }     useParams() → { id: "1" }
│                             │
Find post with id=2           Find post with id=1
│                             │
Display post content          Display post content
```

---

## 📊 Component Communication

```
                    ┌──────────────────┐
                    │   main.jsx       │
                    │   ↓              │
                    │  <App />         │
                    └────────┬─────────┘
                             │
                    ┌────────┴─────────┐
                    │  AuthProvider    │
                    │  (Context)       │
                    └────────┬─────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
     ┌──────┴──────┐  ┌──────┴──────┐  ┌─────┴──────┐
     │   Navbar    │  │   Routes    │  │  Login     │
     │             │  │             │  │            │
     │ useAuth() ←─┼──┤             ├──┤ useAuth()  │
     │             │  │             │  │            │
     └─────────────┘  └──────┬──────┘  └────────────┘
                             │
                      ┌──────┴──────┐
                      │ Protected   │
                      │   Route     │
                      │             │
                      │ useAuth() ←─┤
                      └──────┬──────┘
                             │
                      ┌──────┴──────┐
                      │  Profile    │
                      │  (Nested)   │
                      └─────────────┘
```

---

## 🎨 State Management Flow

```
AuthContext Provider
│
├── State:
│   └── user: { username, id } or null
│
├── Functions:
│   ├── login(username)
│   │   └── setUser({ username, id: Date.now() })
│   │
│   ├── logout()
│   │   └── setUser(null)
│   │
│   └── isAuthenticated()
│       └── return user !== null
│
└── Consumed By:
    ├── Navbar.jsx
    │   └── Shows login/logout, username
    │
    ├── Login.jsx
    │   └── Calls login() on form submit
    │
    ├── ProtectedRoute.jsx
    │   └── Checks isAuthenticated()
    │
    ├── Profile.jsx
    │   └── Displays username
    │
    └── ProfileOverview.jsx
        └── Shows user info
```

---

## 🚦 Route Decision Tree

```
User navigates to URL
        │
        ↓
┌───────────────┐
│ React Router  │
│ Matches Route │
└───────┬───────┘
        │
        ├─── / ────────────────────► Home (Public)
        │
        ├─── /about ───────────────► About (Public)
        │
        ├─── /login ───────────────► Login (Public)
        │
        ├─── /blog ────────────────► Blog List (Public)
        │
        ├─── /blog/:id ────────────► Blog Post (Dynamic, Public)
        │                             │
        │                             ├─ Valid ID ──► Show Post
        │                             └─ Invalid ID ► Show "Not Found"
        │
        ├─── /profile* ────────────► ProtectedRoute Check
        │                             │
        │                        ┌────┴─────┐
        │                        │ Auth?    │
        │                        └────┬─────┘
        │                             │
        │                      ┌──────┴───────┐
        │                      │              │
        │                     YES            NO
        │                      │              │
        │               ┌──────┴───────┐      └──► Redirect to /login
        │               │              │
        │           /profile      /profile/details
        │               │              │
        │          Overview        Details
        │
        │               │
        │         /profile/settings
        │               │
        │           Settings
        │
        └─── /* (anything else) ───► 404 Not Found
```

---

## 🔄 Navigation Methods

### Declarative Navigation (Link)
```jsx
<Link to="/about">About</Link>
        │
        ↓
Click triggers navigation
        │
        ↓
React Router updates URL
        │
        ↓
Component renders
```

### Programmatic Navigation (useNavigate)
```jsx
const navigate = useNavigate();

Event/Condition
        │
        ↓
navigate('/profile')
        │
        ↓
React Router updates URL
        │
        ↓
Component renders
```

---

## 📱 Responsive Navbar States

```
Not Authenticated:
┌──────────────────────────────────────────────────────┐
│ [React Router Advanced]  Home | About | Blog | Login │
└──────────────────────────────────────────────────────┘

Authenticated:
┌───────────────────────────────────────────────────────────────────┐
│ [React Router Advanced]  Home | About | Blog | Profile | [Logout] │
└───────────────────────────────────────────────────────────────────┘
                                                           ↑
                                                    Shows username
```

---

## ✨ Complete Feature Map

```
react-router-advanced
│
├── 🔓 Public Features
│   ├── Home page with feature overview
│   ├── About page with project info
│   ├── Blog listing with posts
│   ├── Individual blog posts (dynamic)
│   └── Login form
│
├── 🔒 Protected Features (Login Required)
│   └── Profile Section (Nested)
│       ├── Overview (default)
│       ├── Details
│       └── Settings
│
├── 🛡️ Security Features
│   ├── Route protection
│   ├── Auth context management
│   ├── Automatic login redirect
│   └── Protected content hiding
│
├── 🗺️ Routing Features
│   ├── Nested routes with Outlet
│   ├── Dynamic routes with params
│   ├── Protected routes with guards
│   ├── Index routes
│   ├── 404 catch-all
│   └── Programmatic navigation
│
└── 🎨 UI Features
    ├── Responsive navbar
    ├── Active link highlighting
    ├── Conditional rendering
    ├── Form validation
    └── Dark theme styling
```

---

**Application is live at: http://localhost:5173** 🚀
