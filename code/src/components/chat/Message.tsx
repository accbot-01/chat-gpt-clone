import type { Message as MessageType } from '../../types/chat.types';
import { formatTime } from '../../utils/dateFormatter';
import { User, Bot, Copy, RefreshCw } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';
import { useState } from 'react';

interface MessageProps {
  message: MessageType;
  onRegenerate?: () => void;
}

export function Message({ message, onRegenerate }: MessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article 
      role="article"
      aria-label={`Message from ${isUser ? 'You' : 'ChatGPT'}`}
      className={`flex gap-4 p-6 ${isUser ? 'bg-transparent' : 'bg-gray-50 dark:bg-gray-800/50'}`}
    >
      {/* Avatar */}
      <div 
        aria-hidden="true"
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-blue-600 text-white' 
            : 'bg-green-600 text-white'
        }`}
      >
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {isUser ? 'You' : 'ChatGPT'}
          </span>
          <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={new Date(message.timestamp).toISOString()}>
            {formatTime(message.timestamp)}
          </time>
        </div>

        {/* Message content */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {isUser ? (
            <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">{message.content}</p>
          ) : (
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeString = String(children).replace(/\n$/, '');

                  return !inline && match ? (
                    <CodeBlock language={match[1]} code={codeString} />
                  ) : (
                    <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}

          {message.isStreaming && (
            <span 
              className="inline-block w-1.5 h-4 ml-1 bg-gray-900 dark:bg-gray-100 animate-pulse"
              aria-label="Typing"
            />
          )}
        </div>

        {/* Actions - only show for completed assistant messages */}
        {!isUser && !message.isStreaming && (
          <div className="flex items-center gap-2 mt-3" role="group" aria-label="Message actions">
            <IconButton
              icon={<Copy size={16} />}
              label="Copy message"
              size="sm"
              onClick={handleCopy}
              className={copied ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'}
            />
            {onRegenerate && (
              <IconButton
                icon={<RefreshCw size={16} />}
                label="Regenerate response"
                size="sm"
                onClick={onRegenerate}
                className="text-gray-600 dark:text-gray-400"
              />
            )}
            {copied && (
              <span className="text-xs text-green-600 dark:text-green-400" role="status" aria-live="polite">
                Copied!
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
