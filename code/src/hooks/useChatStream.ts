import { useCallback, useState, useRef } from 'react';
import { generateMockResponse, simulateLatency } from '../services/mockBackend';
import { streamResponse, StreamController } from '../services/streamSimulator';

export function useChatStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const streamControllerRef = useRef<StreamController>(new StreamController());

  const startStream = useCallback(async (
    userMessage: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void
  ) => {
    setIsStreaming(true);
    streamControllerRef.current.reset();

    try {
      // Simulate API latency
      await simulateLatency();

      // Generate response
      const responseText = generateMockResponse(userMessage);

      // Stream the response
      let fullText = '';
      for await (const chunk of streamResponse(responseText)) {
        if (streamControllerRef.current.isAborted()) {
          break;
        }

        fullText += chunk;
        onChunk(fullText);
      }

      onComplete();
    } catch (error) {
      console.error('Streaming error:', error);
      onComplete();
    } finally {
      setIsStreaming(false);
    }
  }, []);

  const stopStream = useCallback(() => {
    streamControllerRef.current.abort();
    setIsStreaming(false);
  }, []);

  return {
    isStreaming,
    startStream,
    stopStream
  };
}
