import React, { createContext, useContext, useState, useEffect } from "react";
import { UserContextType } from "../Types/Types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {

  const [selectedColor, setSelectedColor] = useState("foreground");

  useEffect(() => {
    const storedColor = localStorage.getItem("user_selectedColor");
    if (storedColor){
      setSelectedColor(JSON.parse(localStorage.getItem("user_selectedColor") as string));
    } else {
      setSelectedColor("primary")};
  }, []);

  return (
    <UserContext.Provider 
      value={{
        selectedColor,
        setSelectedColor,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
