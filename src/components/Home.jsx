import AddRecipeForm from './AddRecipeForm';
import RecipeList from './RecipeList';

const Home = () => {
  return (
    <div className="home-container">
      <section className="welcome-section">
        <h1>🍳 Welcome to Recipe Sharing</h1>
        <p>Share your favorite recipes with the community. Add, edit, and manage your recipes easily!</p>
      </section>

      <div className="content-grid">
        <AddRecipeForm />
        <RecipeList />
      </div>
    </div>
  );
};

export default Home;
