import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UIState } from '../types/chat.types';

interface UIContextType extends UIState {
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage('chatgpt-clone-sidebar', true);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('chatgpt-clone-theme', 'light');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const value: UIContextType = {
    sidebarOpen,
    theme,
    toggleSidebar,
    setTheme,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUIContext() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within UIProvider');
  }
  return context;
}
