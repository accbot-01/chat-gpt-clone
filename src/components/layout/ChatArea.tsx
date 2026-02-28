import { useChatContext } from '../../context/ChatContext';
import { MessageList } from '../chat/MessageList';

export function ChatArea() {
  const { activeConversation, isStreaming } = useChatContext();

  return (
    <div className="flex-1 flex flex-col bg-white">
      <MessageList
        messages={activeConversation?.messages || []}
        isStreaming={isStreaming}
      />
    </div>
  );
}
