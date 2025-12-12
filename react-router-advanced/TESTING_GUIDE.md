# Testing Guide - React Router Advanced

This guide provides detailed test cases to verify all routing functionality in the application.

## 🧪 Test Categories

### 1. Basic Navigation Tests

#### Test 1.1: Home Page Navigation
- **Steps**: 
  1. Open the application (`http://localhost:5173`)
  2. Verify Home page loads correctly
  3. Check that navigation bar is visible with all links
- **Expected**: Home page displays welcome message and feature cards

#### Test 1.2: About Page Navigation
- **Steps**: 
  1. Click "About" in the navigation
  2. Verify URL changes to `/about`
- **Expected**: About page displays project information

#### Test 1.3: Blog Page Navigation
- **Steps**: 
  1. Click "Blog" in the navigation
  2. Verify URL changes to `/blog`
  3. Verify blog posts are displayed in a grid
- **Expected**: Blog page shows 4 blog post cards

---

### 2. Protected Routes Tests

#### Test 2.1: Access Protected Route Without Authentication
- **Steps**: 
  1. Ensure you're logged out (no username shown in navbar)
  2. Click "Profile" in the navigation
  3. Observe the redirect
- **Expected**: 
  - Redirects to `/login`
  - Login page displays with username input field

#### Test 2.2: Login Flow
- **Steps**: 
  1. On the Login page, enter any username (e.g., "TestUser")
  2. Click "Login" button
  3. Observe the redirect
- **Expected**: 
  - Redirects to `/profile`
  - Username appears in navigation bar
  - Profile page displays with "Welcome back, TestUser!" message

#### Test 2.3: Access Protected Route After Authentication
- **Steps**: 
  1. After logging in, click "Profile" in navigation
  2. Verify profile page loads
- **Expected**: 
  - Profile page displays immediately
  - No redirect to login
  - Username visible in navbar

#### Test 2.4: Logout Flow
- **Steps**: 
  1. While logged in, click "Logout (username)" button in navbar
  2. Observe behavior
- **Expected**: 
  - User is logged out
  - Profile link no longer accessible without redirect
  - "Login" link appears in navbar

---

### 3. Nested Routes Tests

#### Test 3.1: Profile Overview (Index Route)
- **Steps**: 
  1. Login and navigate to Profile (`/profile`)
  2. Verify the default view
- **Expected**: 
  - URL is `/profile`
  - Overview tab is active in sidebar
  - Account Information and Quick Stats displayed

#### Test 3.2: Navigate to Profile Details
- **Steps**: 
  1. From Profile page, click "Profile Details" in sidebar
  2. Check URL and content
- **Expected**: 
  - URL changes to `/profile/details`
  - Personal Information, Bio, and Skills sections displayed
  - Details link is highlighted in sidebar

#### Test 3.3: Navigate to Profile Settings
- **Steps**: 
  1. From Profile page, click "Settings" in sidebar
  2. Check URL and content
- **Expected**: 
  - URL changes to `/profile/settings`
  - Settings form with checkboxes displayed
  - Settings link is highlighted in sidebar

#### Test 3.4: Direct URL Access to Nested Route
- **Steps**: 
  1. While logged in, manually enter `/profile/details` in browser address bar
  2. Press Enter
- **Expected**: 
  - Profile Details page loads directly
  - Sidebar navigation shows correct active state
  - Layout remains consistent

#### Test 3.5: Nested Route Navigation Persistence
- **Steps**: 
  1. Navigate between Overview, Details, and Settings multiple times
  2. Observe the sidebar and main content
- **Expected**: 
  - Sidebar remains visible throughout
  - Only the main content area changes
  - URL updates correctly for each section

---

### 4. Dynamic Routes Tests

#### Test 4.1: Access Blog Post by ID
- **Steps**: 
  1. Navigate to Blog page
  2. Click on the first blog post ("Getting Started with React Router")
  3. Verify URL and content
- **Expected**: 
  - URL changes to `/blog/1`
  - Blog post title, content, author, and date displayed
  - "Back to Blog" button visible

#### Test 4.2: Navigate Between Blog Posts
- **Steps**: 
  1. From `/blog/1`, click "Back to Blog"
  2. Click on a different blog post
  3. Verify new post loads
- **Expected**: 
  - Different post content displays
  - URL updates to new post ID
  - Correct author and date shown

#### Test 4.3: Direct URL Access to Blog Post
- **Steps**: 
  1. Manually enter `/blog/3` in browser address bar
  2. Press Enter
- **Expected**: 
  - Blog post #3 loads directly
  - All post content visible
  - Navigation works correctly

#### Test 4.4: Invalid Blog Post ID
- **Steps**: 
  1. Manually enter `/blog/999` in browser address bar
  2. Press Enter
- **Expected**: 
  - "Post Not Found" message displays
  - "Back to Blog" button available
  - No application errors

#### Test 4.5: Back Button Functionality
- **Steps**: 
  1. Navigate to any blog post
  2. Click "Back to Blog" button
- **Expected**: 
  - Returns to blog listing page
  - All blog posts visible

---

### 5. 404 Error Handling Tests

#### Test 5.1: Access Non-Existent Route
- **Steps**: 
  1. Manually enter `/random-page` in browser address bar
  2. Press Enter
- **Expected**: 
  - 404 Not Found page displays
  - Large "404" text visible
  - "Go Home" and "Go Back" buttons present

#### Test 5.2: Go Home from 404
- **Steps**: 
  1. From 404 page, click "Go Home" button
- **Expected**: 
  - Redirects to home page (`/`)
  - Home page content displays

#### Test 5.3: Go Back from 404
- **Steps**: 
  1. Navigate: Home → About → Invalid URL (`/test`)
  2. Click "Go Back" button
- **Expected**: 
  - Returns to previous page (About)
  - Browser history works correctly

---

### 6. Navigation Bar Tests

#### Test 6.1: Navbar Links - Not Authenticated
- **Steps**: 
  1. Ensure you're logged out
  2. Check navbar links
- **Expected Links**: Home, About, Blog, Login

#### Test 6.2: Navbar Links - Authenticated
- **Steps**: 
  1. Login with any username
  2. Check navbar links
- **Expected Links**: Home, About, Blog, Profile, Logout (username)

#### Test 6.3: Active Link Highlighting
- **Steps**: 
  1. Click through each navbar link
  2. Observe visual feedback
- **Expected**: 
  - Current page link has different styling
  - Hover effects work on all links

---

### 7. Authentication Context Tests

#### Test 7.1: Auth State Persistence During Session
- **Steps**: 
  1. Login as "Alice"
  2. Navigate to different pages
  3. Return to Profile
- **Expected**: 
  - Username "Alice" persists throughout session
  - No need to re-login
  - Profile remains accessible

#### Test 7.2: Auth State After Logout
- **Steps**: 
  1. Login as "Bob"
  2. Navigate to Profile Details
  3. Logout
  4. Try to access `/profile` or `/profile/details`
- **Expected**: 
  - Logout clears auth state
  - Attempting to access Profile redirects to Login
  - Username no longer in navbar

---

### 8. Browser Navigation Tests

#### Test 8.1: Browser Back Button
- **Steps**: 
  1. Navigate: Home → About → Blog → Blog Post
  2. Click browser back button multiple times
- **Expected**: 
  - Each click goes to previous page in history
  - URLs update correctly
  - Content loads properly

#### Test 8.2: Browser Forward Button
- **Steps**: 
  1. After using back button, click forward button
- **Expected**: 
  - Moves forward through navigation history
  - Pages restore correctly

#### Test 8.3: Browser Refresh
- **Steps**: 
  1. Navigate to any page
  2. Press F5 or Ctrl+R
- **Expected**: 
  - Page reloads correctly
  - Same content displays
  - Auth state is lost (expected in this demo)

---

### 9. Edge Cases & Error Handling

#### Test 9.1: Empty Username Login
- **Steps**: 
  1. Go to Login page
  2. Leave username field empty
  3. Click Login button
- **Expected**: 
  - Login should not proceed (form validation)
  - Remains on login page

#### Test 9.2: Whitespace-Only Username
- **Steps**: 
  1. Go to Login page
  2. Enter only spaces in username field
  3. Click Login button
- **Expected**: 
  - Login should not proceed
  - Form validates input

#### Test 9.3: Special Characters in Blog Post ID
- **Steps**: 
  1. Manually enter `/blog/abc` in address bar
- **Expected**: 
  - "Post Not Found" message displays
  - No JavaScript errors in console

---

### 10. Responsive Design Tests (Optional)

#### Test 10.1: Mobile View
- **Steps**: 
  1. Resize browser to mobile width (< 768px)
  2. Navigate through pages
- **Expected**: 
  - Layout adapts to smaller screen
  - Navigation remains functional
  - Content is readable

#### Test 10.2: Tablet View
- **Steps**: 
  1. Resize browser to tablet width (768px - 1024px)
  2. Check all pages
- **Expected**: 
  - Layout adjusts appropriately
  - All features remain accessible

---

## ✅ Test Checklist Summary

Use this checklist to track your testing progress:

- [ ] Basic navigation works for all public pages
- [ ] Protected routes redirect when not authenticated
- [ ] Login/logout functionality works correctly
- [ ] Nested routes load and navigate properly
- [ ] Dynamic routes work with URL parameters
- [ ] Invalid blog post IDs show appropriate message
- [ ] 404 page displays for non-existent routes
- [ ] Navbar updates based on auth state
- [ ] Browser back/forward buttons work correctly
- [ ] Browser refresh maintains page state
- [ ] Form validation works on login page
- [ ] No console errors during normal operation

---

## 🐛 Common Issues & Solutions

### Issue 1: Profile page redirects after refresh
**Cause**: Auth state is in-memory only  
**Solution**: This is expected behavior in the demo. Production apps would persist auth in localStorage/cookies

### Issue 2: Nested routes show 404 on direct access
**Cause**: Protected route redirects to login  
**Solution**: Login first, then access nested routes

### Issue 3: Back button doesn't work as expected
**Cause**: Using `replace` prop in Navigate components  
**Solution**: This is intentional to prevent redirect loops

---

## 📊 Testing Results Template

```
Test Date: _____________
Tester: _____________

| Test ID | Test Name | Status | Notes |
|---------|-----------|--------|-------|
| 1.1     | Home Page | ✅/❌  |       |
| 1.2     | About Page | ✅/❌  |       |
| ...     | ...        | ✅/❌  |       |

Overall Result: PASS / FAIL
Issues Found: ___________
```

---

**Note**: This is a demonstration application. In production, implement:
- Automated tests (Jest, React Testing Library)
- E2E tests (Playwright, Cypress)
- Security testing
- Performance testing
- Accessibility testing (a11y)
