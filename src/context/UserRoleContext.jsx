import React, { createContext, useContext, useState } from 'react';

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState(null); // 'donor' | 'taker' | null

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
