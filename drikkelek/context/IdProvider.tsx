import { ReactNode, useState } from "react";
import { IdContext } from "./IdContext";

interface IdProviderProps {
  children: ReactNode;
}

export const IdProvider: React.FC<IdProviderProps> = ({ children }) => {
  const [id, setId] = useState<any>();

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
};
