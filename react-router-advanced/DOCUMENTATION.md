# React Router Advanced - Routing Techniques Demo

A comprehensive React application demonstrating advanced routing techniques using React Router v6, including nested routes, protected routes, dynamic routing, and authentication patterns.

## 🎯 Project Overview

This project showcases various routing patterns and techniques essential for building modern React applications:

- **Protected Routes**: Authentication-based route protection
- **Nested Routes**: Hierarchical routing structure for complex layouts
- **Dynamic Routes**: URL parameters for content-specific pages
- **Authentication System**: Context-based user authentication
- **404 Handling**: Custom not-found page

## 🚀 Features

### 1. Protected Routes
- Login-required access to Profile pages
- Automatic redirection to login for unauthenticated users
- Post-login redirection to intended destination
- Simulated authentication system using React Context

### 2. Nested Routes
- Profile section with sub-routes:
  - Profile Overview (default/index route)
  - Profile Details
  - Profile Settings
- Shared layout with sidebar navigation
- Active link highlighting

### 3. Dynamic Routes
- Blog system with individual post pages
- URL parameters (`/blog/:id`)
- Dynamic content loading based on route params
- 404 handling for non-existent posts

### 4. Navigation
- Responsive navigation bar
- Conditional rendering based on auth status
- Active link states
- Programmatic navigation

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Main navigation component
│   ├── Navbar.css
│   └── ProtectedRoute.jsx      # Route protection wrapper
├── contexts/
│   └── AuthContext.jsx         # Authentication context & provider
├── pages/
│   ├── Home.jsx                # Landing page
│   ├── About.jsx               # About page
│   ├── Login.jsx               # Login page
│   ├── Blog.jsx                # Blog listing page
│   ├── BlogPost.jsx            # Individual blog post (dynamic)
│   ├── Profile.jsx             # Profile layout (nested routes)
│   ├── ProfileOverview.jsx     # Profile index route
│   ├── ProfileDetails.jsx      # Profile details nested route
│   ├── ProfileSettings.jsx     # Profile settings nested route
│   ├── NotFound.jsx            # 404 page
│   └── *.css                   # Component styles
├── App.jsx                     # Main app with router configuration
├── App.css
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router v6** - Routing library
- **Vite** - Build tool and dev server
- **React Context API** - State management for authentication

## 📦 Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:5173`

## 🎮 Usage Guide

### Testing Protected Routes
1. Click on "Profile" in the navigation (without logging in)
2. You'll be redirected to the Login page
3. Enter any username (no password required - it's a demo!)
4. You'll be redirected back to the Profile page

### Exploring Nested Routes
1. Login to access the Profile section
2. Use the sidebar navigation to switch between:
   - Overview
   - Profile Details
   - Settings
3. Notice the URL changes and content updates while the layout remains

### Testing Dynamic Routes
1. Navigate to "Blog" section
2. Click on any blog post
3. Notice the URL contains the post ID (`/blog/1`, `/blog/2`, etc.)
4. Try accessing a non-existent post ID in the URL
5. You'll see a "Post Not Found" message

### Testing 404 Page
1. Try navigating to any non-existent route (e.g., `/random-page`)
2. The custom 404 page will be displayed
3. Use the buttons to navigate back

## 🔑 Key Concepts Demonstrated

### 1. Route Configuration
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/blog/:id" element={<BlogPost />} />
  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
    <Route index element={<ProfileOverview />} />
    <Route path="details" element={<ProfileDetails />} />
    <Route path="settings" element={<ProfileSettings />} />
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 2. Protected Route Component
```jsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
```

### 3. Using URL Parameters
```jsx
const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));
  // ... render post content
};
```

### 4. Nested Routes with Outlet
```jsx
const Profile = () => {
  return (
    <div>
      <nav>{/* Sidebar navigation */}</nav>
      <Outlet /> {/* Renders nested route content */}
    </div>
  );
};
```

## 🎨 Features Breakdown

### Authentication System
- Context-based state management
- Login/logout functionality
- Persistent auth state during session
- Conditional UI rendering

### Navigation
- Programmatic navigation using `useNavigate()`
- Declarative navigation using `<Link>` components
- Active link highlighting with NavLink
- Back button functionality

### Route Types
- **Public Routes**: Accessible to all users (Home, About, Blog)
- **Protected Routes**: Require authentication (Profile section)
- **Dynamic Routes**: Use URL parameters (Blog posts)
- **Nested Routes**: Hierarchical structure (Profile subsections)
- **Index Routes**: Default child route (Profile Overview)
- **Catch-all Route**: 404 page for undefined routes

## 🧪 Testing Scenarios

1. **Protected Route Access**:
   - Access Profile without login → Redirects to Login
   - Login → Redirects back to Profile
   - Logout → Redirects to Home

2. **Nested Navigation**:
   - Profile → Overview (default)
   - Profile → Details
   - Profile → Settings
   - Direct URL access to nested routes

3. **Dynamic Routing**:
   - Browse blog posts
   - Access post by ID
   - Invalid post ID handling

4. **404 Handling**:
   - Invalid routes display NotFound page
   - Navigation options to recover

## 📚 Learning Outcomes

After exploring this project, you will understand:
- How to set up React Router in a Vite project
- Implementing authentication-based route protection
- Creating nested route structures
- Using dynamic route parameters
- Handling 404 pages
- Context API for global state management
- Programmatic vs. declarative navigation
- Best practices for organizing routes in React apps

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📝 Notes

- This is a demonstration project with simulated authentication
- In production, implement proper backend authentication
- Add token management and secure storage
- Implement proper error boundaries
- Add loading states for async operations
- Consider code splitting for better performance

## 🤝 Contributing

Feel free to fork this project and experiment with additional routing patterns such as:
- Route-based code splitting
- Animated route transitions
- Query parameters
- Hash-based routing
- Route guards with role-based access

## 📄 License

This project is created for educational purposes.

---

**Happy Routing! 🚀**
