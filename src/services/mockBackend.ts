const mockResponses = [
  "I'd be happy to help with that! Here's what you need to know:\n\nLet me break this down into key points for clarity.",
  "That's an interesting question. Let me provide a comprehensive answer:\n\n1. First, consider the context\n2. Then, evaluate the options\n3. Finally, make an informed decision",
  "Based on what you've described, I recommend the following approach:\n\nStart with the fundamentals and build from there.",
  "Great question! Here's how I would approach this:\n\nThe key is to understand the underlying principles first.",
  "I can help you with that. Let me explain:\n\nThis is a common scenario, and there are several ways to handle it.",
  "Let me share some insights on this topic:\n\n- Point one: This is important because...\n- Point two: Consider this aspect...\n- Point three: Don't forget about...",
  "That's a complex topic, but I'll try to simplify it:\n\nThink of it like this - when you..., you're essentially...",
  "I understand your concern. Here's what you should know:\n\nThe solution depends on your specific requirements.",
  "Absolutely! I can guide you through this. Let's start with the basics:\n\nFirst, you'll need to understand...",
  "Here's a detailed explanation:\n\nThe concept revolves around three main ideas that work together.",
];

const codeResponses = [
  "Here's a code example that demonstrates this:\n\n```javascript\nconst example = 'Hello World';\nconsole.log(example);\n```\n\nThis shows the basic structure you'll need.",
  "I can help with that code. Here's how you'd implement it:\n\n```typescript\ninterface User {\n  id: string;\n  name: string;\n}\n\nconst users: User[] = [];\n```",
  "Let me show you a working solution:\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"World\"))\n```",
];

export function generateMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Code-related keywords
  if (lowerMessage.includes('code') || 
      lowerMessage.includes('function') || 
      lowerMessage.includes('implement') ||
      lowerMessage.includes('example')) {
    return codeResponses[Math.floor(Math.random() * codeResponses.length)];
  }
  
  // Default responses
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}
