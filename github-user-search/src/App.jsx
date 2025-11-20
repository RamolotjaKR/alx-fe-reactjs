import { useState } from 'react'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and explore their profiles</p>
      </header>
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
        <div className="results-container">
          {/* Results will be displayed here */}
        </div>
      </main>
    </div>
  )
}

export default App
