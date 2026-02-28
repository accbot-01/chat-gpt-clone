import { createContext, useContext, useCallback, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useChatStream } from '../hooks/useChatStream';
import { Conversation, Message, ChatState } from '../types/chat.types';

interface ChatContextType extends ChatState {
  createConversation: () => void;
  deleteConversation: (id: string) => void;
  sendMessage: (content: string) => void;
  setActiveConversation: (id: string) => void;
  activeConversation: Conversation | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('chatgpt-clone-conversations', []);
  const [activeConversationId, setActiveConversationId] = useLocalStorage<string | null>('chatgpt-clone-active', null);
  const { streamMessage, isStreaming } = useChatStream();

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const createConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newConversation.id);
  }, [conversations, setConversations, setActiveConversationId]);

  const deleteConversation = useCallback((id: string) => {
    setConversations(conversations.filter(c => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(conversations[0]?.id || null);
    }
  }, [conversations, activeConversationId, setConversations, setActiveConversationId]);

  const sendMessage = useCallback(async (content: string) => {
    let conversationId = activeConversationId;

    // If no active conversation, create one first
    if (!conversationId) {
      const newConversation: Conversation = {
        id: generateId(),
        title: 'New Chat',
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      conversationId = newConversation.id;
      setConversations([newConversation, ...conversations]);
      setActiveConversationId(conversationId);
    }

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    // Add user message
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              title: conv.messages.length === 0 ? content.slice(0, 50) : conv.title,
              updatedAt: Date.now(),
            }
          : conv
      )
    );

    // Create placeholder for streaming message
    const assistantMessageId = generateId();

    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, assistantMessage],
              updatedAt: Date.now(),
            }
          : conv
      )
    );

    // Stream the response
    await streamMessage(
      content,
      (chunk) => {
        setConversations(prevConversations =>
          prevConversations.map(conv =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: conv.messages.map(msg =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: chunk }
                      : msg
                  ),
                }
              : conv
          )
        );
      },
      (fullMessage) => {
        setConversations(prevConversations =>
          prevConversations.map(conv =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: conv.messages.map(msg =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: fullMessage }
                      : msg
                  ),
                }
              : conv
          )
        );
      }
    );
  }, [activeConversationId, conversations, setConversations, setActiveConversationId, streamMessage]);

  const value: ChatContextType = {
    conversations,
    activeConversationId,
    isStreaming,
    createConversation,
    deleteConversation,
    sendMessage,
    setActiveConversation: setActiveConversationId,
    activeConversation,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
}
