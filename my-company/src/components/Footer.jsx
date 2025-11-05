import React from 'react'

function Footer(){
  return (
    <footer style={{
      backgroundColor: '#222',
      color: 'white',
      padding: '12px 20px',
      textAlign: 'center'
    }}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  )
}

export default Footer
