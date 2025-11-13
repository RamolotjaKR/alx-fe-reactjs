import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  // ========== CORE RECIPE MANAGEMENT ==========
  recipes: [],

  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [
        ...state.recipes,
        {
          ...newRecipe,
          id: Date.now().toString(),
        },
      ],
    })),

  setRecipes: (recipes) => set({ recipes }),

  updateRecipe: (recipeId, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),

  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    })),

  // ========== SEARCH & FILTERING ==========
  searchTerm: '', // Current search query entered by the user
  filteredRecipes: [], // Array of recipes that match the search criteria

  // Update the search term in the store
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Filter recipes based on the current search term
  // Searches in both recipe title and description (case-insensitive)
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        (recipe.description &&
          recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase()))
      ),
    })),

  // Alternative: Computed filtered recipes (used for real-time filtering)
  // This function can be called directly to get filtered results without updating state
  getFilteredRecipes: (state) =>
    state.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      (recipe.description && recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase()))
    ),

  // ========== FAVORITES & RECOMMENDATIONS ==========
  favorites: [], // Array of recipe IDs that the user has favorited

  // Add a recipe to favorites (prevents duplicates)
  addFavorite: (recipeId) =>
    set((state) => {
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state;
    }),

  // Remove a recipe from favorites
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Check if a recipe is in favorites
  isFavorite: (recipeId, state) => state.favorites.includes(recipeId),

  // Generate personalized recommendations based on user's favorites
  // Logic: Suggests recipes that are NOT already favorited, using randomization for variety
  generateRecommendations: () =>
    set((state) => {
      // Filter out recipes that are already in favorites
      const nonFavoriteRecipes = state.recipes.filter(
        (recipe) => !state.favorites.includes(recipe.id)
      );
      
      // Use randomization to provide variety in recommendations
      // In a real app, this could use collaborative filtering, content-based filtering,
      // or machine learning to suggest recipes based on ingredients, cuisine type, etc.
      const recommended = nonFavoriteRecipes.filter(() => Math.random() > 0.5);
      
      // Return up to 5 recommendations
      return { recommendations: recommended.slice(0, 5) };
    }),

  recommendations: [], // Array of recommended recipes
}));

export default useRecipeStore;
