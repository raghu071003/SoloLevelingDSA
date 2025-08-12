import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// 1. Create Context Object (no need for defaultValue if unused)
export const MyContext = createContext();

// 2. Create Provider Component
export function ContextProvider({ children }) {
    const [open,setOpen] = useState(false);
    const [prob,setProb] = useState([]);
    const [loggedin,setLoggedIn] = useState(false);
    const [user,setUser] = useState();
    const [name,setName] = useState("");

    useEffect(()=>{
      authStatus()
    })
  const onClose = ()=>{
        setOpen(false);
    }
    const authStatus = async()=>{
      try {
        const res = await axios.post('http://localhost:8090/api/v1/user/authStatus',{},{withCredentials:true});
        if(res.status === 200){
          setLoggedIn(true);
          
          setUser(res.data.user)
        }
      } catch (error) {
        
      }
    }

  return (
    <MyContext.Provider value={{ open, setOpen,prob,setProb,onClose,loggedin,setLoggedIn,user,setUser,name,setName }}>
      {children}
    </MyContext.Provider>
  );
}
