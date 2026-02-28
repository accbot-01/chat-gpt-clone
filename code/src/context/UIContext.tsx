import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Theme } from '../types/chat.types';

interface UIContextType {
  sidebarOpen: boolean;
  theme: Theme;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: Theme) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage('chatgpt-sidebar-open', true);
  const [theme, setTheme] = useLocalStorage<Theme>('chatgpt-theme', 'dark');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Apply theme to document
  if (typeof document !== 'undefined') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <UIContext.Provider
      value={{
        sidebarOpen,
        theme,
        toggleSidebar,
        setSidebarOpen,
        setTheme
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
}
