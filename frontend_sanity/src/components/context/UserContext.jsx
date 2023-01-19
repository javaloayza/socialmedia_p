import React, { createContext, useState } from 'react';

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicialmente null, cambiar cuando el usuario se loguea

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
