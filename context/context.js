"use client"
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [isClick, setIsClick] = useState(false);
    
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [ searchQuery, setSearchQuery ] = useState("")
    const [loading, setLoading] = useState(true)
    
   

    const value = {
        isClick,
        setIsClick,
          
        isDarkMode,
        setIsDarkMode,

        searchQuery,   
        setSearchQuery ,
        loading, setLoading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAppContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AuthProvider");
    }
    return context;
}