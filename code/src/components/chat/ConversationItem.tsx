import type { Conversation as ConversationType } from '../../types/chat.types';
import { formatTimestamp } from '../../utils/dateFormatter';
import { MessageSquare, Trash2, Edit2, Check, X } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { useState } from 'react';

interface ConversationItemProps {
  conversation: ConversationType;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  onRename: (newTitle: string) => void;
}

export function ConversationItem({ 
  conversation, 
  isActive, 
  onClick, 
  onDelete,
  onRename 
}: ConversationItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(conversation.title);
  const [isHovered, setIsHovered] = useState(false);

  const handleRename = () => {
    if (editTitle.trim()) {
      onRename(editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(conversation.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      className={`group relative px-3 py-2 rounded-lg cursor-pointer transition-all ${
        isActive 
          ? 'bg-gray-200 dark:bg-gray-700' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      onClick={() => !isEditing && onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-2">
        <MessageSquare size={16} className="flex-shrink-0 mt-0.5 text-gray-600 dark:text-gray-400" />
        
        {isEditing ? (
          <div className="flex-1 flex items-center gap-1">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <IconButton
              icon={<Check size={14} />}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRename();
              }}
              className="text-green-600"
            />
            <IconButton
              icon={<X size={14} />}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              className="text-red-600"
            />
          </div>
        ) : (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {conversation.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatTimestamp(conversation.updatedAt)}
              </p>
            </div>

            {isHovered && !isEditing && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <IconButton
                  icon={<Edit2 size={14} />}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="text-gray-600 dark:text-gray-400"
                />
                <IconButton
                  icon={<Trash2 size={14} />}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Delete this conversation?')) {
                      onDelete();
                    }
                  }}
                  className="text-red-600"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
