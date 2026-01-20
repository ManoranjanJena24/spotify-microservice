// import axios from "axios";
// import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// const server = "http://localhost:5000";

// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   playlist: string[];
// }

// interface UserContextType {
//   user: User | null;
//   isAuth:boolean;
//   loading: boolean;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// interface UserProviderProps {
//   children: ReactNode;
// }

// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const [user, setUser] = useState();
//   const [loading, setLoading] = useState(true);
//   const [isAuth, setIsAuth] = useState(false);
//   async function fetchUser() {
//     try {
//       const { data } = await axios.get(`${server}/api/v1/user/me`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });

//       setUser(data);
//       setIsAuth(true);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   useEffect(()=>{
//     fetchUser()
//   },[])

//   return (
//     <UserContext.Provider value={{ user ,loading,isAuth }}>{children}</UserContext.Provider>
//   );
// };

// export const useUserData = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserData must be used within a UserProvider");
//   }
//   return context;
// };

import axios from "axios";
import type path from "path";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import toast, {Toaster} from 'react-hot-toast'

const server = "http://localhost:5000";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  playlist: string[];
}

interface UserContextType {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Added this
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>; // Added this
  btnLoading:boolean;
  loginUser:(
    email:string,
    password:string,
    navigate:(path: string)=> void,
  )=> Promise<void>;
  registerUser:(
    name:string,
    email:string,
    password:string,
    navigate:(path: string)=> void,
  )=> Promise<void>;
  logoutUser:()=> Promise <void>  ; 




}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // FIX: Initialize with type and null
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false)

  async function loginUser(email:string ,password:string , navigate:(path:string)=> void){
    setBtnLoading(true)
    try {
        const {data} = await axios.post(`${server}/api/v1/user/login`,{
            email , password
        })

        toast.success(data.message)
        localStorage.setItem("token",data.token)
        setUser(data.user)
        setIsAuth(true)
        setBtnLoading(false)
        navigate("/")
        
    } catch (error: any ) {
        console.log(error)
        toast.error(error.response?.data?.message || "An error occured")
        setBtnLoading(false)
    }
  }





    async function registerUser(
      name:string,
      email: string,
      password: string,
      navigate: (path: string) => void,
    ) {
      setBtnLoading(true);
      try {
        const { data } = await axios.post(`${server}/api/v1/user/register`, {
            name,
          email,
          password,
        });

        toast.success(data.message);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
        setBtnLoading(false);
        navigate("/");
      } catch (error: any) {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occured");
        setBtnLoading(false);
      }
    }

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await axios.get(`${server}/api/v1/user/me`, {
        headers: {
          token: token,
        },
      });

      setUser(data.user); // Note: verify if your API returns {user: ...} or just the object
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  async function logoutUser(){
    localStorage.clear()
    setUser(null);
    setIsAuth(false)

    toast.success("User Logged Out")

  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuth,
        setUser,
        setIsAuth,
        btnLoading,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUserData = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};
