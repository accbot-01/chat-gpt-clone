import { useState } from 'react';
import { generateMockResponse } from '../services/mockBackend';
import { streamResponse } from '../services/streamSimulator';

export function useChatStream() {
  const [isStreaming, setIsStreaming] = useState(false);

  const streamMessage = async (
    userMessage: string,
    onChunk: (chunk: string) => void,
    onComplete: (fullMessage: string) => void
  ) => {
    setIsStreaming(true);
    
    try {
      const responseText = generateMockResponse(userMessage);
      let fullContent = '';
      
      for await (const chunk of streamResponse(responseText)) {
        fullContent += chunk;
        onChunk(fullContent);
      }
      
      onComplete(fullContent);
    } catch (error) {
      console.error('Streaming error:', error);
      onComplete('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsStreaming(false);
    }
  };

  return { streamMessage, isStreaming };
}
