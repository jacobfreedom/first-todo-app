// import { type } from "os";
import React, { createContext, useContext, useState, ReactNode } from "react";
// import {selectedColor} from '../components/navigationbar' !!I added this

// type ColorContextType = {
//   selectedColor: string;
//   setSelectedColor: (color: string) => void;
// };

// export const ColorContext = createContext<ColorContextType | undefined>(undefined);

// export const useColorContext = () => {
//   const context = useContext(ColorContext);
//   if (context === undefined) {
//     throw new Error("useColorContext must be used within a ColorProvider");
//   }
//   return context;
// };

// type ColorProviderProps = {
//   children: ReactNode;
// };

// export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
//   const [selectedColor, setSelectedColor] = useState("primary");

//   return (
//     <ColorContext.Provider value={[ selectedColor, setSelectedColor ]}>
//       {children}
//     </ColorContext.Provider>
//   );
// };


// My CODE!!!!

// type ColorThemeContextType = {
//   selectedColor: string;
//   setSelectedColor: string;
// };


// export const ColorThemeContext = createContext<selectedColor | undefined>(undefined);

// export function useColorThemeContext()  {
//   const selectedColor = useContext(ColorThemeContext);

//     if (selectedColor === undefined) {
//     throw new Error("useColorThemeContext must be used within a ColorThemeContext");

//     return selectedColor;
// };





// global state creation

// const initialState = "blue";

// export const Context = createContext();

// const ColorTheme ({children}) => {
//   const [selectedColor, setSelectedColor] = React.useState(initialState);

//   return <Context.Provider value={[selectedColor, setSelectedColor]}>{children}</Context.Provider>
// }

// export default ColorTheme;


// new code after understanding it



export interface ColorContextType {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [selectedColor, setSelectedColor] = useState("blue");

  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}