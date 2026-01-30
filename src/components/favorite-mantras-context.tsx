import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FaithMantra } from "./faith-mantras-config";

interface FavoriteMantrasContextType {
  favoriteMantras: FaithMantra[];
  isFavorite: (mantraId: string) => boolean;
  toggleFavorite: (mantra: FaithMantra) => void;
  removeFavorite: (mantraId: string) => void;
  clearFavorites: () => void;
  getFavoritesByFaith: (faith: string) => FaithMantra[];
  getFavoritesByCategory: (category: FaithMantra['category']) => FaithMantra[];
}

const FavoriteMantrasContext = createContext<FavoriteMantrasContextType | undefined>(undefined);

export function useFavoriteMantras() {
  const context = useContext(FavoriteMantrasContext);
  if (!context) {
    throw new Error("useFavoriteMantras must be used within FavoriteMantrasProvider");
  }
  return context;
}

const STORAGE_KEY = 'divinityagi_favorite_mantras';

interface FavoriteMantrasProviderProps {
  children: ReactNode;
}

export function FavoriteMantrasProvider({ children }: FavoriteMantrasProviderProps) {
  const [favoriteMantras, setFavoriteMantras] = useState<FaithMantra[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavoriteMantras(parsed);
      }
    } catch (error) {
      console.error('Failed to load favorite mantras:', error);
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteMantras));
    } catch (error) {
      console.error('Failed to save favorite mantras:', error);
    }
  }, [favoriteMantras]);

  const isFavorite = (mantraId: string): boolean => {
    return favoriteMantras.some(m => m.id === mantraId);
  };

  const toggleFavorite = (mantra: FaithMantra) => {
    setFavoriteMantras(prev => {
      const exists = prev.some(m => m.id === mantra.id);
      if (exists) {
        return prev.filter(m => m.id !== mantra.id);
      } else {
        return [...prev, mantra];
      }
    });
  };

  const removeFavorite = (mantraId: string) => {
    setFavoriteMantras(prev => prev.filter(m => m.id !== mantraId));
  };

  const clearFavorites = () => {
    setFavoriteMantras([]);
  };

  const getFavoritesByFaith = (faith: string): FaithMantra[] => {
    return favoriteMantras.filter(m => 
      m.tradition.toLowerCase() === faith.toLowerCase()
    );
  };

  const getFavoritesByCategory = (category: FaithMantra['category']): FaithMantra[] => {
    return favoriteMantras.filter(m => m.category === category);
  };

  return (
    <FavoriteMantrasContext.Provider
      value={{
        favoriteMantras,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        getFavoritesByFaith,
        getFavoritesByCategory
      }}
    >
      {children}
    </FavoriteMantrasContext.Provider>
  );
}
