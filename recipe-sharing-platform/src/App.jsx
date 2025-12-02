import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Recipe Sharing Platform
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Welcome to your new React + Tailwind CSS project!
        </p>
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Tailwind CSS is working! ✨
        </p>
      </div>
    </div>
  )
}

export default App
