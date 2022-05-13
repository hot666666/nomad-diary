import React, { useContext } from "react";

export const ContextDB = React.createContext();
export const useDB = () => {
  return useContext(ContextDB);
};
