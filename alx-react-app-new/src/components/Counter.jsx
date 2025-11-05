import React from 'react';
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '360px',
      margin: '20px auto',
      textAlign: 'center',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
    }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#2c3e50' }}>Counter</h3>
      <p style={{ fontSize: '1.2rem', margin: '8px 0' }}>Current Count: <strong>{count}</strong></p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          Increment
        </button>

        <button
          onClick={() => setCount(count - 1)}
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          Decrement
        </button>

        <button
          onClick={() => setCount(0)}
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
