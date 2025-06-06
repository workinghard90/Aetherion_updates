import React, { createContext, useContext, useState, ReactNode } from "react";

type CaelumContextType = {
  presence: string;
  setPresence: (p: string) => void;
};

const CaelumContext = createContext<CaelumContextType | undefined>(undefined);

export function CaelumProvider({ children }: { children: ReactNode }) {
  const [presence, setPresence] = useState("Awake");
  return (
    <CaelumContext.Provider value={{ presence, setPresence }}>
      {children}
    </CaelumContext.Provider>
  );
}

export function useCaelum() {
  const ctx = useContext(CaelumContext);
  if (!ctx) {
    throw new Error("useCaelum must be used within a CaelumProvider");
  }
  return ctx;
}
