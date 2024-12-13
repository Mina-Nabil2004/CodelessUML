import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {

  const [nodeColors, setNodeColors] = useState({
    class:'#000000',
    interface:'#a30096',
    abstractClass: '#656565',
    enum: '#00776b'
  })

  return (
    <AppContext.Provider
      value={{
        nodeColors, setNodeColors
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
