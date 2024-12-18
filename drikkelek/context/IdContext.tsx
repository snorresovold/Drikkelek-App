import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
type IdContextType = {
  id: any;
  setId: React.Dispatch<React.SetStateAction<any>>;
};

// Set default values to avoid undefined error
export const IdContext = createContext<IdContextType | undefined>(undefined);

// Custom hook for using the context
export const useId = () => {
  const context = useContext(IdContext);
  if (!context) throw new Error("useId must be used within an IdProvider");
  return context;
};
