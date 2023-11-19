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

  const [selectedColor, setSelectedColor] = useState(() => {
    const storedColor = localStorage.getItem("user_selectedColor");
    return storedColor ? JSON.parse(storedColor) : "primary";
  });

  const [selectedTab, setSelectedTab] = useState(() => {
    const storedTab = localStorage.getItem("user_selectedTab");
    return storedTab ? JSON.parse(storedTab) : "In Progress";
  });

  const handleSelectedTabChange = (newTab: string) => {
    setSelectedTab(newTab);
    localStorage.setItem('user_selectedTab', JSON.stringify(newTab));
  };

  useEffect(() => {
    localStorage.setItem("user_selectedColor", JSON.stringify(selectedColor));
  }, [selectedColor]);

  useEffect(() => {
    localStorage.setItem("user_selectedTab", JSON.stringify(selectedTab));
  }, [selectedTab]);

  return (
    <UserContext.Provider 
      value={{
        selectedColor,
        setSelectedColor,
        selectedTab,
        setSelectedTab,
        handleSelectedTabChange
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
