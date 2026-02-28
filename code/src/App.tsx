import { lazy, Suspense } from 'react';
import { ChatProvider } from './context/ChatContext';
import { UIProvider } from './context/UIContext';

// Lazy load heavy components for code splitting
const Sidebar = lazy(() => import('./components/layout/Sidebar').then(m => ({ default: m.Sidebar })));
const ChatArea = lazy(() => import('./components/layout/ChatArea').then(m => ({ default: m.ChatArea })));

function App() {
  return (
    <UIProvider>
      <ChatProvider>
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-gray-500 dark:text-gray-400">Loading...</div>
            </div>
          }>
            <Sidebar />
            <ChatArea />
          </Suspense>
        </div>
      </ChatProvider>
    </UIProvider>
  );
}

export default App;
