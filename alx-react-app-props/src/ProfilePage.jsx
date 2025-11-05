import React from 'react';
import UserInfo from './UserInfo';

function ProfilePage() {
  // No props needed anymore; UserInfo will consume context
  return <UserInfo />;
}

export default ProfilePage;
