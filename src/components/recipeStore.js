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
  searchTerm: '',

  setSearchTerm: (term) => set({ searchTerm: term }),

  getFilteredRecipes: (state) =>
    state.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      (recipe.description && recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase()))
    ),

  // ========== FAVORITES & RECOMMENDATIONS ==========
  favorites: [],

  addFavorite: (recipeId) =>
    set((state) => {
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state;
    }),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  isFavorite: (recipeId, state) => state.favorites.includes(recipeId),

  generateRecommendations: () =>
    set((state) => {
      // Recommendations based on favorites: show other recipes not in favorites
      const recommended = state.recipes.filter(
        (recipe) =>
          !state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended.slice(0, 5) };
    }),

  recommendations: [],
}));

export default useRecipeStore;
