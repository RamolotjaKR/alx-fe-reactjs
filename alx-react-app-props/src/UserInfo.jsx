import React from 'react';
import UserDetails from './UserDetails';

function UserInfo() {
  // No props passed; UserDetails will read from context
  return <UserDetails />;
}

export default UserInfo;
