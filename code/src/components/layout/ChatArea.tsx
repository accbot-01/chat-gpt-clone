import { Menu } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useUI } from '../../context/UIContext';
import { MessageList } from '../chat/MessageList';
import { StreamingIndicator } from '../chat/StreamingIndicator';
import { InputBar } from '../input/InputBar';
import { IconButton } from '../ui/IconButton';

export function ChatArea() {
  const { activeConversation, isStreaming } = useChat();
  const { setSidebarOpen } = useUI();

  return (
    <div className="flex-1 flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <IconButton
          icon={<Menu size={24} />}
          label="Open sidebar"
          onClick={() => setSidebarOpen(true)}
        />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          ChatGPT Clone
        </h1>
      </div>

      {/* Messages */}
      <MessageList messages={activeConversation?.messages || []} />

      {/* Streaming Indicator */}
      {isStreaming && activeConversation?.messages.every(m => !m.isStreaming) && (
        <StreamingIndicator />
      )}

      {/* Input */}
      <InputBar />
    </div>
  );
}
