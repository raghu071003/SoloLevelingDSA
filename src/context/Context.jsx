import React, { createContext, useState } from 'react';

// 1. Create Context Object (no need for defaultValue if unused)
export const MyContext = createContext();

// 2. Create Provider Component
export function ContextProvider({ children }) {
    const [open,setOpen] = useState(false);
    const [prob,setProb] = useState([]);

  const onClose = ()=>{
        setOpen(false);
    }

  return (
    <MyContext.Provider value={{ open, setOpen,prob,setProb,onClose }}>
      {children}
    </MyContext.Provider>
  );
}
