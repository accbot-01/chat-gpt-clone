import { ChatProvider } from './context/ChatContext';
import { UIProvider } from './context/UIContext';
import { Sidebar } from './components/layout/Sidebar';
import { ChatArea } from './components/layout/ChatArea';
import { InputBar } from './components/layout/InputBar';

function App() {
  return (
    <UIProvider>
      <ChatProvider>
        <div className="h-screen flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <ChatArea />
            <InputBar />
          </main>
        </div>
      </ChatProvider>
    </UIProvider>
  );
}

export default App;
