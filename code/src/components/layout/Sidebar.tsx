import { Plus, Menu, X, Sun, Moon } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useUI } from '../../context/UIContext';
import { ConversationItem } from '../chat/ConversationItem';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';

export function Sidebar() {
  const { 
    conversations, 
    activeConversationId, 
    createConversation, 
    deleteConversation, 
    setActiveConversation,
    updateConversationTitle 
  } = useChat();
  
  const { sidebarOpen, setSidebarOpen, theme, setTheme } = useUI();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNewChat = () => {
    createConversation();
    // Close sidebar on mobile after creating chat
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                ChatGPT Clone
              </h1>
              <IconButton
                icon={sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                label="Toggle sidebar"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              />
            </div>
            <Button
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleNewChat}
            >
              <Plus size={18} />
              New Chat
            </Button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {conversations.length === 0 ? (
              <div className="text-center py-8 px-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No conversations yet
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Start a new chat to begin
                </p>
              </div>
            ) : (
              conversations.map(conversation => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={conversation.id === activeConversationId}
                  onClick={() => {
                    setActiveConversation(conversation.id);
                    // Close sidebar on mobile after selecting conversation
                    if (window.innerWidth < 768) {
                      setSidebarOpen(false);
                    }
                  }}
                  onDelete={() => deleteConversation(conversation.id)}
                  onRename={(newTitle) => updateConversationTitle(conversation.id, newTitle)}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Theme
              </span>
              <IconButton
                icon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                label="Toggle theme"
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-400"
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
