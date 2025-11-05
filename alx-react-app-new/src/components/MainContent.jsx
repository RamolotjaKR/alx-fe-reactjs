import React from 'react';

function MainContent() {
  return (
    <main style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)', // Ensures footer stays at bottom
      backgroundColor: '#ffffff'
    }}>
      <section style={{
        marginBottom: '30px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          color: '#2c3e50',
          marginBottom: '15px'
        }}>Welcome to Our Website</h2>
        <p style={{
          lineHeight: '1.6',
          color: '#34495e'
        }}>
          This is the main content area of our website. Here you can find interesting information about various topics.
        </p>
      </section>
    </main>
  );
}

export default MainContent;