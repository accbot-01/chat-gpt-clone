import { useState, useRef, createElement } from 'react';
import type { KeyboardEvent } from 'react';
import { Send, Smile, Square } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { useChat } from '../../context/ChatContext';
import 'emoji-picker-element';

export function InputBar() {
  const { sendMessage, isStreaming, stopGeneration } = useChat();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (message.trim() && !isStreaming) {
      sendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleEmojiSelect = (event: any) => {
    const emoji = event.detail.unicode;
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  // Close emoji picker when clicking outside
  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto p-4">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="mb-2 relative">
            <div 
              ref={emojiPickerRef}
              className="absolute bottom-full mb-2 left-0 shadow-lg rounded-lg overflow-hidden"
            >
              {createElement('emoji-picker', {
                class: 'light',
                'onEmoji-click': handleEmojiSelect
              })}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT..."
              rows={1}
              disabled={isStreaming}
              className="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 pr-20 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ maxHeight: '200px' }}
            />
            
            {/* Emoji button inside textarea */}
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <IconButton
                icon={<Smile size={20} />}
                label="Add emoji"
                onClick={handleEmojiPickerToggle}
                disabled={isStreaming}
                className="text-gray-500 dark:text-gray-400"
              />
            </div>
          </div>

          {/* Send/Stop Button */}
          {isStreaming ? (
            <IconButton
              icon={<Square size={20} />}
              label="Stop generation"
              onClick={stopGeneration}
              className="bg-red-600 hover:bg-red-700 text-white p-3"
            />
          ) : (
            <IconButton
              icon={<Send size={20} />}
              label="Send message"
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 disabled:bg-gray-300 dark:disabled:bg-gray-700"
            />
          )}
        </div>

        {/* Help text */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
