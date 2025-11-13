import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1>🥘 Recipe Sharing App</h1>
            <p className="tagline">Discover, Create, and Share Amazing Recipes</p>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <div className="home-container">
                  <div className="content-grid">
                    <AddRecipeForm />
                    <RecipeList />
                  </div>
                </div>
              }
            />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2025 Recipe Sharing App. Built with React, Vite, Zustand, and ❤️</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
