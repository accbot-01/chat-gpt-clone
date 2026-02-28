import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Conversation, Message } from '../types/chat.types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useChatStream } from '../hooks/useChatStream';
import { generateId, generateConversationTitle } from '../utils/helpers';

interface ChatContextType {
  conversations: Conversation[];
  activeConversationId: string | null;
  activeConversation: Conversation | null;
  isStreaming: boolean;
  
  createConversation: () => string;
  deleteConversation: (id: string) => void;
  setActiveConversation: (id: string) => void;
  sendMessage: (content: string) => void;
  stopGeneration: () => void;
  regenerateResponse: (messageId: string) => void;
  updateConversationTitle: (id: string, title: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('chatgpt-conversations', []);
  const [activeConversationId, setActiveConversationIdState] = useLocalStorage<string | null>('chatgpt-active-conversation', null);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  
  const { isStreaming, startStream, stopStream } = useChatStream();

  // Get active conversation
  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  // Create new conversation
  const createConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    setConversations([newConversation, ...conversations]);
    setActiveConversationIdState(newConversation.id);
    
    return newConversation.id;
  }, [conversations, setConversations, setActiveConversationIdState]);

  // Delete conversation
  const deleteConversation = useCallback((id: string) => {
    const updatedConversations = conversations.filter(c => c.id !== id);
    setConversations(updatedConversations);

    // If deleting active conversation, switch to another or create new
    if (id === activeConversationId) {
      if (updatedConversations.length > 0) {
        setActiveConversationIdState(updatedConversations[0].id);
      } else {
        setActiveConversationIdState(null);
      }
    }
  }, [conversations, activeConversationId, setConversations, setActiveConversationIdState]);

  // Set active conversation
  const setActiveConversation = useCallback((id: string) => {
    setActiveConversationIdState(id);
  }, [setActiveConversationIdState]);

  // Update conversation title
  const updateConversationTitle = useCallback((id: string, title: string) => {
    setConversations(conversations.map(c => 
      c.id === id ? { ...c, title, updatedAt: Date.now() } : c
    ));
  }, [conversations, setConversations]);

  // Send message
  const sendMessage = useCallback((content: string) => {
    if (!content.trim() || isStreaming) return;

    let conversationId = activeConversationId;

    // Create conversation if none exists
    if (!conversationId) {
      conversationId = createConversation();
    }

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now()
    };

    const assistantMessageId = generateId();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true
    };

    // Add user message and empty assistant message
    setConversations(conversations.map(c => {
      if (c.id === conversationId) {
        const updatedMessages = [...c.messages, userMessage, assistantMessage];
        const updatedTitle = c.messages.length === 0 ? generateConversationTitle(content) : c.title;
        
        return {
          ...c,
          title: updatedTitle,
          messages: updatedMessages,
          updatedAt: Date.now()
        };
      }
      return c;
    }));

    setStreamingMessageId(assistantMessageId);

    // Start streaming
    startStream(
      content,
      (chunk) => {
        // Update streaming message
        setConversations(prevConversations => prevConversations.map(c => {
          if (c.id === conversationId) {
            return {
              ...c,
              messages: c.messages.map(m =>
                m.id === assistantMessageId
                  ? { ...m, content: chunk, isStreaming: true }
                  : m
              )
            };
          }
          return c;
        }));
      },
      () => {
        // Complete streaming
        setConversations(prevConversations => prevConversations.map(c => {
          if (c.id === conversationId) {
            return {
              ...c,
              messages: c.messages.map(m =>
                m.id === assistantMessageId
                  ? { ...m, isStreaming: false }
                  : m
              ),
              updatedAt: Date.now()
            };
          }
          return c;
        }));
        setStreamingMessageId(null);
      }
    );
  }, [activeConversationId, conversations, isStreaming, createConversation, setConversations, startStream]);

  // Stop generation
  const stopGeneration = useCallback(() => {
    stopStream();
    
    if (streamingMessageId) {
      setConversations(prevConversations => prevConversations.map(c => {
        if (c.id === activeConversationId) {
          return {
            ...c,
            messages: c.messages.map(m =>
              m.id === streamingMessageId
                ? { ...m, isStreaming: false }
                : m
            )
          };
        }
        return c;
      }));
      setStreamingMessageId(null);
    }
  }, [stopStream, streamingMessageId, activeConversationId, setConversations]);

  // Regenerate response
  const regenerateResponse = useCallback((messageId: string) => {
    if (isStreaming || !activeConversation) return;

    const messageIndex = activeConversation.messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1 || messageIndex === 0) return;

    // Get the previous user message
    const userMessage = activeConversation.messages[messageIndex - 1];
    if (userMessage.role !== 'user') return;

    // Remove the old assistant message
    const updatedMessages = activeConversation.messages.filter(m => m.id !== messageId);

    const newAssistantMessageId = generateId();
    const newAssistantMessage: Message = {
      id: newAssistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true
    };

    // Add new empty assistant message
    setConversations(conversations.map(c => {
      if (c.id === activeConversationId) {
        return {
          ...c,
          messages: [...updatedMessages, newAssistantMessage],
          updatedAt: Date.now()
        };
      }
      return c;
    }));

    setStreamingMessageId(newAssistantMessageId);

    // Start streaming new response
    startStream(
      userMessage.content,
      (chunk) => {
        setConversations(prevConversations => prevConversations.map(c => {
          if (c.id === activeConversationId) {
            return {
              ...c,
              messages: c.messages.map(m =>
                m.id === newAssistantMessageId
                  ? { ...m, content: chunk, isStreaming: true }
                  : m
              )
            };
          }
          return c;
        }));
      },
      () => {
        setConversations(prevConversations => prevConversations.map(c => {
          if (c.id === activeConversationId) {
            return {
              ...c,
              messages: c.messages.map(m =>
                m.id === newAssistantMessageId
                  ? { ...m, isStreaming: false }
                  : m
              ),
              updatedAt: Date.now()
            };
          }
          return c;
        }));
        setStreamingMessageId(null);
      }
    );
  }, [activeConversation, activeConversationId, conversations, isStreaming, setConversations, startStream]);

  // Create initial conversation if none exists
  useEffect(() => {
    if (conversations.length === 0 && !activeConversationId) {
      // Don't auto-create, let user click "New Chat"
    }
  }, [conversations.length, activeConversationId]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationId,
        activeConversation,
        isStreaming,
        createConversation,
        deleteConversation,
        setActiveConversation,
        sendMessage,
        stopGeneration,
        regenerateResponse,
        updateConversationTitle
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
