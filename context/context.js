"use client"
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [isClick, setIsClick] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [ searchQuery, setSearchQuery ] = useState("")
    
   

    const value = {
        isClick,
        setIsClick,
        isSidebarOpen,
        setIsSidebarOpen,  
        isDarkMode,
        setIsDarkMode,

        searchQuery,    // renamed from searchText
        setSearchQuery 
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