import { createContext, useContext, useEffect, useState } from "react";

export const MainContext = createContext();

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainContextProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [window.location.href]);

  return (
    <MainContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </MainContext.Provider>
  );
};
