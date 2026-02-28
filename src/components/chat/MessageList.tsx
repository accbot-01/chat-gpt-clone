import { Message } from './Message';
import { StreamingIndicator } from './StreamingIndicator';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { Message as MessageType } from '../../types/chat.types';

interface MessageListProps {
  messages: MessageType[];
  isStreaming: boolean;
}

export function MessageList({ messages, isStreaming }: MessageListProps) {
  const scrollRef = useAutoScroll(messages);

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <h3 className="text-lg font-medium mb-2">Start a Conversation</h3>
          <p className="text-sm">Send a message to begin chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto py-4"
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {isStreaming && <StreamingIndicator />}
    </div>
  );
}
