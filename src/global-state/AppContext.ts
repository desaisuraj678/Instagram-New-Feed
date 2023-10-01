import { createContext } from "react";

export const AppContext = createContext({isLoggedIn : false,logout:()=>{},login:()=>{}})