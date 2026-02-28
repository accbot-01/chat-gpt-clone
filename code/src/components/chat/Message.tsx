import type { Message as MessageType } from '../../types/chat.types';
import { formatTime } from '../../utils/dateFormatter';
import { User, Bot, Copy, RefreshCw } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
    <div className={`flex gap-4 p-6 ${isUser ? 'bg-transparent' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-green-600 text-white'
      }`}>
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {isUser ? 'You' : 'ChatGPT'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(message.timestamp)}
          </span>
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
                    <div className="relative group my-4">
                      <div className="flex items-center justify-between bg-gray-900 rounded-t-lg px-4 py-2">
                        <span className="text-xs text-gray-400">{match[1]}</span>
                        <button
                          onClick={() => navigator.clipboard.writeText(codeString)}
                          className="text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          Copy code
                        </button>
                      </div>
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          fontSize: '0.875rem'
                        }}
                        {...props}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
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
            <span className="inline-block w-1.5 h-4 ml-1 bg-gray-900 dark:bg-gray-100 animate-pulse" />
          )}
        </div>

        {/* Actions - only show for completed assistant messages */}
        {!isUser && !message.isStreaming && (
          <div className="flex items-center gap-2 mt-3">
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
              <span className="text-xs text-green-600 dark:text-green-400">Copied!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
