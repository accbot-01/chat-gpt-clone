import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message as MessageType } from '../../types/chat.types';
import { formatRelativeTime } from '../../utils/dateFormatter';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 px-4`}>
      <div className={`max-w-[80%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div
          className={`rounded-lg p-4 ${
            isUser
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: ({ node, className, children, ...props }: any) => {
                    const inline = !(className && /language-/.test(className));
                    return !inline ? (
                      <div className="relative">
                        <pre className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code className="bg-gray-200 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatRelativeTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
