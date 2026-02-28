import { Conversation } from '../../types/chat.types';
import { formatRelativeTime } from '../../utils/dateFormatter';
import { IconButton } from '../ui/IconButton';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export function ConversationItem({ 
  conversation, 
  isActive, 
  onClick, 
  onDelete 
}: ConversationItemProps) {
  return (
    <div
      className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
        isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 flex-shrink-0 text-gray-500"
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
          <h3 className="text-sm font-medium truncate">{conversation.title}</h3>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {formatRelativeTime(conversation.updatedAt)}
        </p>
      </div>
      <IconButton
        icon={
          <svg
            className="w-4 h-4 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        }
        label="Delete conversation"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      />
    </div>
  );
}
