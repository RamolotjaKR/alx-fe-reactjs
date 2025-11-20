import Search from './components/Search'
import './App.css'

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users with advanced filters</p>
      </header>
      <main>
        <Search />
      </main>
    </div>
  )
}

export default App
