import { createContext, useContext, useState } from "react";

const MagnifierContext = createContext<{
  isMagnifierActive: boolean;
  toggleMagnifier: () => void;
}>({ isMagnifierActive: false, toggleMagnifier: () => {} });

export function MagnifierProvider({ children }: { children: React.ReactNode }) {
  const [isMagnifierActive, setIsMagnifierActive] = useState(false);
  const toggleMagnifier = () => {
    console.log(
      "Toggling magnifier from:",
      isMagnifierActive,
      "to:",
      !isMagnifierActive,
    );
    setIsMagnifierActive((prev) => !prev);
  };

  return (
    <MagnifierContext.Provider value={{ isMagnifierActive, toggleMagnifier }}>
      {children}
    </MagnifierContext.Provider>
  );
}

export const useMagnifier = () => useContext(MagnifierContext);
