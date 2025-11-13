import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes();
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="🔍 Search recipes by name or ingredients..."
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
