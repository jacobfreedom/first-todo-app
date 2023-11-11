import React, { createContext, useContext, useState, useEffect } from "react";
import { UserContextType } from "../Types/Types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [selectedColor, setSelectedColor] = useState("primary");
  const [selectedSortingOption, setSelectedSortingOption] = useState("default");
  const [selectedTab, setSelectedTab] = useState("inProgress");

  useEffect(() => {
    const storedColor = localStorage.getItem("selectedColor");
    const storedSortingOption = localStorage.getItem("selectedSortingOption");
    const storedTab = localStorage.getItem("selectedTab");

    if (storedColor) {
      setSelectedColor(storedColor);
    }

    if (storedSortingOption) {
      setSelectedSortingOption(storedSortingOption);
    }

    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);

  return (
    <UserContext.Provider 
    value={{ selectedColor, setSelectedColor, selectedSortingOption, setSelectedSortingOption, selectedTab, setSelectedTab }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
