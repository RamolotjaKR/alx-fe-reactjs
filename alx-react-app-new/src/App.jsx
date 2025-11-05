import React from 'react'
import Header from './components/Header'
import UserProfile from './components/UserProfile'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

function App() {
  const userInfo = {
    name: "John Doe",
    age: 30,
    bio: "A passionate traveler and city explorer who loves to discover new places and cultures."
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <UserProfile 
        name={userInfo.name}
        age={userInfo.age}
        bio={userInfo.bio}
      />
      <MainContent />
      <Footer />
    </div>
  )
}

export default App