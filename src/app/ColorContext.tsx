import React, { createContext, useContext, useState, ReactNode } from "react";

type ColorContextType = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

export const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
};

type ColorProviderProps = {
  children: ReactNode;
};

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState("primary");

  return (
    <ColorContext.Provider value={[ selectedColor, setSelectedColor ]}>
      {children}
    </ColorContext.Provider>
  );
};
