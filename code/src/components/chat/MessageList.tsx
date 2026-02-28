import type { Message as MessageType } from '../../types/chat.types';
import { Message } from './Message';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { useChat } from '../../context/ChatContext';

interface MessageListProps {
  messages: MessageType[];
}

export function MessageList({ messages }: MessageListProps) {
  const { regenerateResponse } = useChat();
  const scrollRef = useAutoScroll([messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            How can I help you today?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start a conversation by typing a message below
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto"
    >
      <div className="max-w-3xl mx-auto">
        {messages.map((message, index) => {
          const isLastAssistantMessage = 
            message.role === 'assistant' && 
            index === messages.length - 1;

          return (
            <Message
              key={message.id}
              message={message}
              onRegenerate={isLastAssistantMessage ? () => regenerateResponse(message.id) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
