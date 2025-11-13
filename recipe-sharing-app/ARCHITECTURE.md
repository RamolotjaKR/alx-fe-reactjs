# Architecture & Component Relationships

## 📊 Component Hierarchy

```
App (with Router)
├── header (app-header)
└── Routes
    ├── Route: / 
    │   └── Home
    │       ├── AddRecipeForm
    │       └── RecipeList
    │           └── Link to RecipeDetails (for each recipe)
    │
    └── Route: /recipe/:id
        └── RecipeDetails
            ├── EditRecipeForm (conditional)
            └── DeleteRecipeButton
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│           Zustand Store (recipeStore.js)        │
│                                                 │
│  State:                                         │
│  - recipes: []                                  │
│                                                 │
│  Actions:                                       │
│  - addRecipe()                                  │
│  - updateRecipe()                               │
│  - deleteRecipe()                               │
│  - setRecipes()                                 │
└────────┬──────────────────────────────────────┘
         │
         │ useRecipeStore() hook
         │
    ┌────┴────┐
    │          │
    ▼          ▼
AddRecipeForm  RecipeList
    │              │
    │              └──────────────┐
    │                             │
    │                    RecipeDetails
    │                             │
    │      ┌──────────────────────┼──────────────────┐
    │      │                      │                  │
    ▼      ▼                      ▼                  ▼
    └─► Store      EditRecipeForm    DeleteRecipeButton
         (add)           (update)           (delete)
```

---

## 🎯 State Management Flow

### Adding a Recipe
```
User fills AddRecipeForm
    ↓
handleSubmit() called
    ↓
Validation check (title & description required)
    ↓
addRecipe() action from Zustand
    ↓
State updated: recipes array grows
    ↓
RecipeList component re-renders
    ↓
New recipe appears in list
    ↓
Form fields cleared
```

### Editing a Recipe
```
User clicks "Edit Recipe" button
    ↓
RecipeDetails enters edit mode
    ↓
EditRecipeForm displayed with current data
    ↓
User modifies fields and clicks "Save Changes"
    ↓
handleSubmit() validates input
    ↓
updateRecipe(recipeId, updatedData) called
    ↓
State updated: matching recipe object merged
    ↓
RecipeDetails exits edit mode
    ↓
Display shows updated recipe information
```

### Deleting a Recipe
```
User clicks "Delete Recipe" button
    ↓
Confirmation dialog appears
    ↓
User confirms deletion
    ↓
deleteRecipe(recipeId) action called
    ↓
State updated: recipe filtered out from array
    ↓
User navigated back to home page
    ↓
RecipeList shows updated list
```

### Navigation Flow
```
Home (/)
    ├─ Add Recipe
    └─ View Recipe Card
         │
         └─ Click "View Details"
              │
              └─► Recipe Details (/recipe/:id)
                   ├─ Edit Recipe
                   │   └─ Save/Cancel
                   └─ Delete Recipe
                       └─ Back to Home (/)
```

---

## 🔌 Component Communication

### Direct Props
- `EditRecipeForm` receives:
  - `recipe` - Current recipe object
  - `onSave` - Callback when save succeeds
  - `onCancel` - Callback when cancel is clicked

- `DeleteRecipeButton` receives:
  - `recipeId` - ID of recipe to delete
  - `onDelete` - Callback when delete succeeds

### Zustand Store (Global State)
All components access state via:
```javascript
const state = useRecipeStore(selector => selector.propertyName)
```

### React Router
- `RecipeDetails` uses `useParams()` to get recipe ID from URL
- `RecipeList` uses `Link` component for navigation
- All components use `useNavigate()` for programmatic navigation

---

## 🔑 Key Patterns

### 1. Selective State Subscription
```javascript
// Only re-renders when recipes change
const recipes = useRecipeStore(state => state.recipes)

// Only re-renders when this specific action is needed
const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
```

### 2. Conditional Rendering
```javascript
// RecipeDetails switches between view and edit mode
{isEditing ? <EditRecipeForm /> : <RecipeView />}
```

### 3. Callback Pattern
```javascript
// Parent passes callback to child
<EditRecipeForm onSave={handleSaveSuccess} />

// Child calls callback after operation
onSave()
```

### 4. URL-based Routing
```javascript
// Recipe ID stored in URL, not state
/recipe/1234567890

// Retrieved using useParams
const { id } = useParams()
```

---

## 📈 Data Structure

### Recipe Object
```javascript
{
  id: 1699872000000,           // Timestamp-based unique ID
  title: "Spaghetti",          // Recipe name
  description: "..."           // Recipe details/instructions
}
```

### Store State
```javascript
{
  recipes: [
    { id: 1, title: "Pizza", description: "..." },
    { id: 2, title: "Pasta", description: "..." },
    // ...
  ]
}
```

---

## 🎯 Performance Considerations

1. **Selective Subscriptions** - Components only subscribe to needed state
2. **Memoization Ready** - Can add React.memo() if needed
3. **Lazy Routing** - Routes can be code-split for larger apps
4. **Efficient Filtering** - DeleteRecipe filters efficiently
5. **Immutable Updates** - Zustand ensures proper state immutability

---

## 🔍 Debugging Tips

### View Store State
```javascript
// In browser console
import useRecipeStore from './src/store/recipeStore'
useRecipeStore.getState()  // See full state
```

### Log State Changes
```javascript
// Subscribe to all state changes
useRecipeStore.subscribe(state => console.log(state))
```

### React DevTools
- Inspect component tree
- Check props and hooks
- Use Profiler to track re-renders

---

## 🚀 Scalability

To extend this architecture:

1. **Add More Stores** - Create separate stores for users, ratings, etc.
2. **Code Splitting** - Lazy load components by route
3. **State Persistence** - Add localStorage/backend integration
4. **API Integration** - Replace direct state updates with API calls
5. **Middleware** - Add logging, error handling middleware to Zustand

---

This architecture is clean, scalable, and maintainable! 🎉
