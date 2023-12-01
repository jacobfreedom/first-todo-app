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
  // const [selectedColor, setSelectedColor] = useState(() => {
  //   if (typeof localStorage !== 'undefined') {
  //     const storedColor = localStorage.getItem("user_selectedColor");
  //     return storedColor ? JSON.parse(storedColor) : "primary";
  //   }
  //   return "primary";
  // });

  const [selectedColor, setSelectedColor] = useState("foreground");

  // const [selectedTab, setSelectedTab] = useState(() => {
  //   if (typeof localStorage !== 'undefined') {
  //     const storedTab = localStorage.getItem("user_selectedTab");
  //     return storedTab ? JSON.parse(storedTab) : "In Progress";
  //   }
  //   return "In Progress";
  // });

  const [selectedTab, setSelectedTab] = useState("");

  const handleSelectedTabChange = (newTab: string) => {
    setSelectedTab(newTab);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user_selectedTab', JSON.stringify(newTab));
      // localStorage.setItem("user_selectedColor", JSON.stringify(selectedColor));
    }
  };


  useEffect(() => {
    const storedColor = localStorage.getItem("user_selectedColor");
    if (storedColor){
      // setSelectedColor(JSON.parse(storedColor))
      setSelectedColor(JSON.parse(localStorage.getItem("user_selectedColor") as string));
    } else {
      setSelectedColor("primary")};

    const storedTab = localStorage.getItem("user_selectedTab");
    if (storedTab){
      console.log('storedTab exists')
      // setSelectedColor(JSON.parse(storedColor))
      setSelectedTab(JSON.parse(localStorage.getItem("user_selectedTab") as string));
    } else {
      console.log('no storedTab')
      setSelectedTab("In Progress")};
      

    
  }, []);

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
