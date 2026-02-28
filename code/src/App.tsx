import { ChatProvider } from './context/ChatContext';
import { UIProvider } from './context/UIContext';
import { Sidebar } from './components/layout/Sidebar';
import { ChatArea } from './components/layout/ChatArea';

function App() {
  return (
    <UIProvider>
      <ChatProvider>
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
          <Sidebar />
          <ChatArea />
        </div>
      </ChatProvider>
    </UIProvider>
  );
}

export default App;
