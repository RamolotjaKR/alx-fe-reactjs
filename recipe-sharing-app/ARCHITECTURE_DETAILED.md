# 🏗️ RECIPE SHARING APP - ARCHITECTURE & COMPONENT GUIDE

**Created:** November 13, 2025  
**Status:** ✅ Complete  

---

## 🎨 APPLICATION ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                    RECIPE SHARING APP                        │
│                   (src/App.jsx - Router)                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
    Home Route                    Recipe Route
   (path: "/")                (path: "/recipe/:id")
        │                             │
        ▼                             ▼
   Home Component            RecipeDetails Component
        │                             │
        ├─ AddRecipeForm              ├─ EditRecipeForm
        │  (Create)                   │  (Update)
        │                             │
        └─ RecipeList                 └─ DeleteRecipeButton
           (Read)                        (Delete)
           │
           └─ Link to Recipe Details
```

---

## 📊 COMPONENT DEPENDENCY DIAGRAM

```
App (BrowserRouter, Routes)
│
├── Header (static)
│
├── Route: "/"
│   └── Home
│       ├── AddRecipeForm
│       │   └── Uses: useRecipeStore.addRecipe
│       │
│       └── RecipeList
│           ├── Uses: useRecipeStore (all recipes)
│           └── Links to: /recipe/:id
│
├── Route: "/recipe/:id"
│   └── RecipeDetails
│       ├── Uses: useParams (get :id)
│       ├── Uses: useRecipeStore (find recipe)
│       ├── Uses: useNavigate (back button)
│       │
│       ├── EditRecipeForm (conditional)
│       │   └── Uses: useRecipeStore.updateRecipe
│       │
│       └── DeleteRecipeButton
│           └── Uses: useRecipeStore.deleteRecipe
│
└── Footer (static)
```

---

## 🔄 STATE MANAGEMENT FLOW

### Zustand Store Structure
```javascript
useRecipeStore = create((set) => ({
  recipes: [],           // State
  addRecipe: fn,        // Action: Create
  setRecipes: fn,       // Action: Initialize
  updateRecipe: fn,     // Action: Update
  deleteRecipe: fn      // Action: Delete
}))
```

### Component Subscriptions
```
Component                Uses State              Uses Actions
──────────────────────────────────────────────────────────────
RecipeList              state.recipes
AddRecipeForm                                   addRecipe()
RecipeDetails           state.recipes           (find only)
EditRecipeForm                                  updateRecipe()
DeleteRecipeButton                              deleteRecipe()
```

### Data Flow Diagram
```
User Action
    │
    ▼
Component Event Handler
    │
    ▼
Call Store Action
    │
    ├─ set(prevState => newState)
    │
    ▼
Zustand Updates State
    │
    ▼
All Subscribed Components
    │
    └─ Re-render with new data
```

---

## 🧩 COMPONENT BREAKDOWN

### 1. App.jsx - Application Shell
```
Purpose: Router configuration and layout wrapper
Tree:
  App
  ├── <BrowserRouter>
  ├── <Routes>
  │   ├── <Route path="/" element={<Home />} />
  │   └── <Route path="/recipe/:id" element={<RecipeDetails />} />
  └── Header & Footer
```

**Key Props:** None (top-level router)  
**Key Hooks:** None  
**Dependencies:** React Router  

---

### 2. Home.jsx - Main Page
```
Purpose: Landing page with add form and recipe list
Tree:
  Home
  ├── Welcome Section
  ├── AddRecipeForm (left column)
  └── RecipeList (right column)
```

**Key Props:** None  
**Key Hooks:** None  
**Dependencies:** AddRecipeForm, RecipeList  

---

### 3. AddRecipeForm.jsx - Create Operation
```
Purpose: Form to add new recipes
Tree:
  AddRecipeForm
  ├── <form>
  ├── <input> title field
  ├── <textarea> description field
  ├── Success message (conditional)
  └── Submit button
```

**Key Props:** None  
**Key Hooks:**
- `useState` - form state (title, description, submitted)
- `useRecipeStore` - addRecipe action

**Actions Called:** `addRecipe({ title, description })`

---

### 4. RecipeList.jsx - Read Operation (List)
```
Purpose: Display all recipes in card format
Tree:
  RecipeList
  ├── <h2> "All Recipes ({count})"
  └── Recipe Cards (mapped)
      ├── Title
      ├── Description preview
      └── "View Details →" Link
  OR
  └── Empty state message
```

**Key Props:** None  
**Key Hooks:**
- `useRecipeStore` - recipes array

**Components Used:** Link (React Router)

---

### 5. RecipeDetails.jsx - Read Operation (Single) & Controller
```
Purpose: Display individual recipe and route to edit/delete
Tree:
  RecipeDetails
  ├── Back button
  ├── (If editing)
  │   └── EditRecipeForm
  ├── (Else)
  │   ├── Recipe title & description
  │   ├── "✏️ Edit Recipe" button
  │   └── DeleteRecipeButton
  └── Error state (if recipe not found)
```

**Key Props:** None  
**Key Hooks:**
- `useParams` - extract recipe ID from URL
- `useNavigate` - programmatic navigation
- `useRecipeStore` - find recipe, access updateRecipe/deleteRecipe
- `useState` - edit mode toggle

**State Variables:**
- `isEditing` - toggle between view/edit mode

---

### 6. EditRecipeForm.jsx - Update Operation
```
Purpose: Form to edit existing recipe
Tree:
  EditRecipeForm
  ├── <form>
  ├── <input> title field (pre-filled)
  ├── <textarea> description field (pre-filled)
  ├── Success message (conditional)
  ├── "💾 Save Changes" button
  └── "Cancel" button
```

**Key Props:**
- `recipe` - current recipe data
- `onSuccess` - callback when save successful
- `onCancel` - callback when cancel clicked

**Key Hooks:**
- `useState` - form state (title, description, saving, message)
- `useRecipeStore` - updateRecipe action

**Actions Called:** `updateRecipe(recipeId, { title, description })`

---

### 7. DeleteRecipeButton.jsx - Delete Operation
```
Purpose: Button to delete recipe with confirmation
Tree:
  DeleteRecipeButton
  ├── Button element
  ├── onClick handler
  ├── window.confirm() dialog
  └── (if confirmed)
      └── Call deleteRecipe action
```

**Key Props:**
- `recipeId` - ID of recipe to delete
- `onSuccess` - callback when delete successful

**Key Hooks:**
- `useState` - loading state (isDeleting)
- `useRecipeStore` - deleteRecipe action

**Actions Called:** `deleteRecipe(recipeId)`

---

## 🔌 ZUSTAND STORE DETAILS

### Store File Location
```
src/store/recipeStore.js
```

### Store API
```javascript
export const useRecipeStore = create((set) => ({
  
  // STATE
  recipes: [],
  
  // ACTIONS
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [
      ...state.recipes,
      { ...newRecipe, id: Date.now().toString() }
    ]
  })),
  
  setRecipes: (recipes) => set({ recipes }),
  
  updateRecipe: (recipeId, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((recipe) =>
      recipe.id === recipeId 
        ? { ...recipe, ...updatedRecipe } 
        : recipe
    )
  })),
  
  deleteRecipe: (recipeId) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== recipeId)
  }))
  
}))
```

### Hook Usage Pattern
```javascript
// Get state
const recipes = useRecipeStore(state => state.recipes)

// Get action
const addRecipe = useRecipeStore(state => state.addRecipe)

// Call action
addRecipe({ title: "...", description: "..." })
```

---

## 🛣️ ROUTING STRUCTURE

### Routes
```
/                   → Home
├── AddRecipeForm
└── RecipeList
    └── Link to /recipe/:id

/recipe/:id         → RecipeDetails
├── EditRecipeForm
└── DeleteRecipeButton
```

### Route Parameters
```javascript
// In RecipeDetails.jsx
const { id } = useParams()  // Gets :id from URL

// Navigate to recipe details
<Link to={`/recipe/${recipe.id}`}>View Details</Link>

// Programmatic navigation
navigate(`/recipe/${id}`)
navigate('/')
```

---

## 📝 DATA MODELS

### Recipe Object
```javascript
{
  id: "1731425600000",           // Generated from Date.now()
  title: "Chocolate Chip Cookies",
  description: "How to make..."
}
```

### State Structure
```javascript
{
  recipes: [
    { id: "...", title: "...", description: "..." },
    { id: "...", title: "...", description: "..." },
    ...
  ]
}
```

---

## 🎯 COMPONENT RESPONSIBILITIES

| Component | Responsibility | CRUD Op |
|-----------|-----------------|---------|
| App | Router setup, layout | - |
| Home | Page layout | - |
| AddRecipeForm | Create form | CREATE |
| RecipeList | Display all recipes | READ |
| RecipeDetails | Show single recipe | READ |
| EditRecipeForm | Edit form | UPDATE |
| DeleteRecipeButton | Delete action | DELETE |

---

## 🔄 INTERACTION SEQUENCES

### Add Recipe Sequence
```
User Input
  ↓
AddRecipeForm.handleSubmit
  ↓
addRecipe(newRecipe)
  ↓
Zustand updates state
  ↓
RecipeList subscribes and re-renders
  ↓
New recipe appears in list
```

### Edit Recipe Sequence
```
User clicks Edit
  ↓
RecipeDetails.setIsEditing(true)
  ↓
EditRecipeForm renders with pre-filled data
  ↓
User modifies and clicks Save
  ↓
updateRecipe(id, changes)
  ↓
Zustand updates state
  ↓
RecipeDetails re-renders with new data
  ↓
setIsEditing(false) - closes form
```

### Delete Recipe Sequence
```
User clicks Delete
  ↓
window.confirm() dialog
  ↓
User confirms
  ↓
deleteRecipe(id)
  ↓
Zustand updates state
  ↓
Navigate to home (/)
  ↓
RecipeList updates (recipe missing)
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Desktop: 900px+ */
.content-grid {
  grid-template-columns: 1fr 1fr;  /* 2 columns */
}

/* Tablet/Mobile: < 900px */
@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;   /* 1 column */
  }
}

/* Mobile: < 600px */
@media (max-width: 600px) {
  /* Stack buttons vertically */
  .recipe-actions {
    flex-direction: column;
  }
}
```

---

## 🎨 STYLING HIERARCHY

```
index.css (Global Styles)
    ↓
App.css (Component Styles)
    ├── App container styles
    ├── Header/Footer styles
    ├── Form styles
    ├── Recipe list/card styles
    ├── Recipe details styles
    └── Button/action styles
```

---

## 🔐 Data Flow Security

1. **Immutable Updates**
   - All state updates use spread operators
   - No direct mutations
   - Zustand handles subscription updates

2. **Validation**
   - Form validation in components
   - HTML5 required attributes
   - Custom logic in handlers

3. **ID Generation**
   - Simple timestamp-based IDs
   - Unique per recipe
   - Matches on delete/update

---

## 🚀 Performance Considerations

1. **Selective Subscriptions**
   - Components only re-render when subscribed state changes
   - RecipeList doesn't re-render on edit (only accesses recipes array)
   - Efficient Zustand usage

2. **No Unnecessary Re-renders**
   - EditRecipeForm is conditional (not rendered when not editing)
   - RecipeList uses key prop for mapped items
   - CSS animations use GPU (transform, opacity)

3. **Bundle Size**
   - Zustand: 2.7KB (lightweight)
   - React Router: ~37KB
   - Total dependencies: ~140KB (gzip)

---

## 📚 File Relationships

```
App.jsx (imports)
├── RecipeDetails.jsx (imports)
│   ├── EditRecipeForm.jsx
│   ├── DeleteRecipeButton.jsx
│   └── useRecipeStore
│
├── Home.jsx (imports)
│   ├── AddRecipeForm.jsx (imports useRecipeStore)
│   └── RecipeList.jsx (imports useRecipeStore)
│
└── All components use
    └── store/recipeStore.js
```

---

## ✅ ARCHITECTURE CHECKLIST

- ✅ Separation of concerns (components focused)
- ✅ Single store (Zustand) for state management
- ✅ React Router for navigation
- ✅ Immutable state updates
- ✅ Reusable components (EditRecipeForm, DeleteRecipeButton)
- ✅ Error handling (recipe not found)
- ✅ Loading states (saving, deleting)
- ✅ Responsive design
- ✅ No prop drilling (using hooks)
- ✅ Clean, maintainable code structure

---

**Architecture Design:** Production-Ready ✅  
**Last Updated:** November 13, 2025  
**Status:** Complete and Documented
