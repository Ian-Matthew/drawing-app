import React from "react";
import { useGallery } from "./useGallary";

const GalleryContext = React.createContext();

type GalleryProviderProps = { children: React.ReactNode };

function GalleryProvider({ children }: GalleryProviderProps) {
  const session = useGallery();

  return (
    <GalleryContext.Provider value={session}>
      {children}
    </GalleryContext.Provider>
  );
}

function useGalleryContext() {
  const context = React.useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("session context must be used within provider");
  }
  return context;
}

export { GalleryProvider, useGalleryContext };
