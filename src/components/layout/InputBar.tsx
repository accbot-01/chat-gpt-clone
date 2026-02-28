import { useState } from 'react';
import { useChatContext } from '../../context/ChatContext';
import { useUIContext } from '../../context/UIContext';
import { RichTextEditor } from '../input/RichTextEditor';
import { EmojiPicker } from '../input/EmojiPicker';
import { SendButton } from '../input/SendButton';

export function InputBar() {
  const [message, setMessage] = useState('');
  const { sendMessage, isStreaming, activeConversationId } = useChatContext();
  const { sidebarOpen, toggleSidebar } = useUIContext();

  const handleSend = () => {
    if (message.trim() && !isStreaming) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-2">
          {/* Mobile menu button */}
          {!sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 mb-1"
              aria-label="Open sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}

          {/* Emoji Picker */}
          <div className="mb-1">
            <EmojiPicker onSelect={handleEmojiSelect} />
          </div>

          {/* Text Input */}
          <div className="flex-1">
            <RichTextEditor
              value={message}
              onChange={setMessage}
              onSend={handleSend}
              disabled={isStreaming}
              placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            />
          </div>

          {/* Send Button */}
          <div className="mb-1">
            <SendButton
              onClick={handleSend}
              disabled={!message.trim() || isStreaming}
            />
          </div>
        </div>

        {/* Hint text */}
        <div className="text-xs text-gray-500 text-center mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
