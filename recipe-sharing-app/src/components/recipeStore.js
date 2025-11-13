// Convenience bridge: re-export the Zustand hook from the central store
// This prevents accidentally creating multiple stores if components import
// from this path instead of `src/store/recipeStore.js`.

import { useRecipeStore } from '../store/recipeStore';

export default useRecipeStore;
export { useRecipeStore };
