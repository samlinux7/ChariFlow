// context/UserRoleContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Simulate a unique test user ID if not already set
    const storedId = localStorage.getItem('test_user_id');
    if (!storedId) {
      const newId = 'test_' + Math.floor(Math.random() * 1000000);
      localStorage.setItem('test_user_id', newId);
      setUserId(newId);
    } else {
      setUserId(storedId);
    }
  }, []);

  return (
    <UserRoleContext.Provider value={{ role, setRole, userId, setUserId }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
