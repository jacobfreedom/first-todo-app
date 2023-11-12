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

  const [selectedSortingOption, setSelectedSortingOption] = useState(() => {
    const storedSortingOption = localStorage.getItem("user_selectedSortingOption");
    return storedSortingOption ? JSON.parse(storedSortingOption) : "createdTimestamp"; // Change the default value here
  });

  const [selectedTab, setSelectedTab] = useState(() => {
    const storedTab = localStorage.getItem("user_selectedTab");
    return storedTab ? JSON.parse(storedTab) : "In Progress";
  });

  const handleSelectedSortingOptionChange = (newSortingOption: string) => {
    setSelectedSortingOption(newSortingOption);
    localStorage.setItem('user_selectedSortingOption', JSON.stringify(newSortingOption));
  };

  const handleSelectedTabChange = (newTab: string) => {
    setSelectedTab(newTab);
    localStorage.setItem('user_selectedTab', JSON.stringify(newTab));
  };

  useEffect(() => {
    localStorage.setItem("user_selectedColor", JSON.stringify(selectedColor));
  }, [selectedColor]);

  useEffect(() => {
    localStorage.setItem("user_selectedSortingOption", JSON.stringify(selectedSortingOption));
  }, [selectedSortingOption]);

  useEffect(() => {
    localStorage.setItem("user_selectedTab", JSON.stringify(selectedTab));
  }, [selectedTab]);

  return (
    <UserContext.Provider 
      value={{
        selectedColor,
        setSelectedColor,
        selectedSortingOption,
        setSelectedSortingOption,
        selectedTab,
        setSelectedTab,
        handleSelectedSortingOptionChange,
        handleSelectedTabChange
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
