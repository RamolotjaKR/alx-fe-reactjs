import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';

export default function App() {
  return (
    <div className="app">
      <Header />
      <MainContent />
      <UserProfile 
        name="Alice Johnson"
        age="25"
        bio="Loves hiking and photography. Always seeking new adventures and capturing beautiful moments through her lens."
      />
      <Footer />
    </div>
  );
}
