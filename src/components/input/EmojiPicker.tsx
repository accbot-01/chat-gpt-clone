import { useState } from 'react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const COMMON_EMOJIS = [
  '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂',
  '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛',
  '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳',
  '👍', '👎', '👌', '✌️', '🤞', '🤝', '👏', '🙌', '🎉', '🎊',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💯',
];

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (emoji: string) => {
    onSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Open emoji picker"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full mb-2 left-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-64">
            <div className="grid grid-cols-8 gap-2">
              {COMMON_EMOJIS.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(emoji)}
                  className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Select ${emoji} emoji`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
