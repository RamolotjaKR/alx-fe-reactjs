import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      position: 'relative',
      bottom: 0,
      width: '100%'
    }}>
      <p style={{
        margin: 0,
        fontSize: '0.9em'
      }}>© 2025 My Favorite Cities. All rights reserved.</p>
      <div style={{
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <a href="#" style={{
          color: 'white',
          textDecoration: 'none',
          ':hover': {
            textDecoration: 'underline'
          }
        }}>Privacy Policy</a>
        <a href="#" style={{
          color: 'white',
          textDecoration: 'none',
          ':hover': {
            textDecoration: 'underline'
          }
        }}>Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;