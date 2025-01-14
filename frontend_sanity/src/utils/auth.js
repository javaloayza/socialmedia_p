import { GUEST_USER } from './guestUser';

// utils/auth.js
export const handleGuestLogin = () => {
  // Store guest user info in localStorage similar to Google auth
  localStorage.setItem('user', JSON.stringify(GUEST_USER));
  return GUEST_USER;
};

export const getUserFromStorage = () => {
  const userInfo = localStorage.getItem('user');
  if (!userInfo || userInfo === 'undefined') return null;

  return JSON.parse(userInfo);
};
