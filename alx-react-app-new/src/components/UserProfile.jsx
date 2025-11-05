import React from 'react';

function UserProfile(props) {
  return (
    <div style={{ 
      border: '1px solid gray', 
      borderRadius: '8px',
      padding: '20px', 
      margin: '20px auto',
      maxWidth: '600px',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#2c3e50', 
        marginBottom: '15px',
        fontSize: '1.5em'
      }}>{props.name}</h2>
      <p style={{ 
        margin: '10px 0',
        color: '#34495e'
      }}>
        Age: <span style={{ 
          fontWeight: 'bold',
          color: '#3498db'
        }}>{props.age}</span>
      </p>
      <p style={{ 
        lineHeight: '1.6',
        color: '#34495e'
      }}>
        Bio: {props.bio}
      </p>
    </div>
  );
}

export default UserProfile;