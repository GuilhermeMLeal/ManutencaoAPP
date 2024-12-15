import React, { createContext, useContext, useState } from "react";

const ReloadContext = createContext<{ reloadKey: number; triggerReload: () => void }>({
  reloadKey: 0,
  triggerReload: () => {},
});

export const ReloadProvider: React.FC = ({ children }: any) => {
  const [reloadKey, setReloadKey] = useState(0);

  const triggerReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <ReloadContext.Provider value={{ reloadKey, triggerReload }}>
      {children}
    </ReloadContext.Provider>
  );
};

export const useReloadContext = () => useContext(ReloadContext);
