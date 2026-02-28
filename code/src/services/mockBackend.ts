interface MockResponse {
  id: string;
  keywords: string[];
  responses: string[];
}

const mockResponses: MockResponse[] = [
  {
    id: 'code-example',
    keywords: ['code', 'example', 'show me', 'how to'],
    responses: [
      `Here's a simple React component example:

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
\`\`\`

This demonstrates the basics of React hooks and state management.`,
      `Let me show you a Python example:

\`\`\`python
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    fib_sequence = [0, 1]
    
    while len(fib_sequence) < n:
        next_num = fib_sequence[-1] + fib_sequence[-2]
        fib_sequence.append(next_num)
    
    return fib_sequence[:n]

# Example usage
print(fibonacci(10))
\`\`\`

This function generates the Fibonacci sequence using a simple loop.`
    ]
  },
  {
    id: 'react-help',
    keywords: ['react', 'component', 'jsx', 'hook'],
    responses: [
      `React is a JavaScript library for building user interfaces. Here are the key concepts:

**1. Components** - Reusable pieces of UI
- Functional components (modern approach)
- Class components (legacy)

**2. JSX** - JavaScript XML syntax
- Write HTML-like code in JavaScript
- Gets compiled to React.createElement calls

**3. Hooks** - Functions that let you use state and lifecycle
- \`useState\` - Add state to functional components
- \`useEffect\` - Perform side effects
- \`useContext\` - Access context values

**4. Props** - Pass data between components
- Immutable data flow
- Parent to child communication

Would you like me to dive deeper into any of these topics?`,
      `React uses a **virtual DOM** to efficiently update the UI. Here's how it works:

1. **State Changes** - When state updates, React creates a new virtual DOM tree
2. **Diffing** - React compares new tree with old tree
3. **Reconciliation** - Only changed elements are updated in real DOM

This makes React fast and efficient, even for complex UIs. The virtual DOM acts as a lightweight copy of the actual DOM, allowing React to batch updates and minimize expensive DOM operations.

Key benefits:
- ⚡ Faster updates
- 🎯 Precise re-renders
- 💾 Lower memory overhead`
    ]
  },
  {
    id: 'typescript',
    keywords: ['typescript', 'types', 'interface', 'type safety'],
    responses: [
      `TypeScript adds static typing to JavaScript. Here's why it's powerful:

**Type Safety**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function greetUser(user: User) {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

**Benefits:**
- 🐛 Catch errors at compile time
- 📝 Better IDE autocomplete
- 📚 Self-documenting code
- 🔄 Easier refactoring

TypeScript is a superset of JavaScript - all valid JS is valid TS!`,
      `Let me explain TypeScript's key features:

**1. Union Types**
\`\`\`typescript
type Status = 'pending' | 'success' | 'error';
\`\`\`

**2. Generics**
\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

**3. Type Inference**
\`\`\`typescript
const numbers = [1, 2, 3]; // inferred as number[]
\`\`\`

**4. Utility Types**
- \`Partial<T>\` - Make all properties optional
- \`Pick<T, K>\` - Select specific properties
- \`Omit<T, K>\` - Exclude properties

TypeScript makes large codebases much more maintainable!`
    ]
  },
  {
    id: 'general-help',
    keywords: ['help', 'how', 'what', 'explain'],
    responses: [
      `I'd be happy to help! I can assist with:

- 💻 **Programming** - JavaScript, Python, TypeScript, React, and more
- 🎨 **Web Development** - HTML, CSS, frontend/backend concepts
- 🔧 **Debugging** - Help identify and fix issues
- 📚 **Learning** - Explain concepts and best practices
- 💡 **Problem Solving** - Break down complex problems

What would you like to know more about?`,
      `Let me help you with that. To give you the best answer, could you provide more details about:

1. What you're trying to achieve
2. What you've tried so far
3. Any error messages you're seeing
4. Your current setup or environment

The more context you provide, the better I can assist you!`
    ]
  },
  {
    id: 'tailwind',
    keywords: ['tailwind', 'css', 'styling', 'design'],
    responses: [
      `Tailwind CSS is a utility-first CSS framework. Here's a quick example:

\`\`\`html
<!-- Traditional CSS -->
<div class="card">
  <h2 class="card-title">Hello</h2>
</div>

<!-- Tailwind approach -->
<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-2xl font-bold text-gray-800">Hello</h2>
</div>
\`\`\`

**Advantages:**
- 🚀 Faster development
- 📦 Smaller bundle size (PurgeCSS removes unused)
- 🎨 Consistent design system
- 🔧 No naming conflicts

**Key Classes:**
- \`p-4\` - padding
- \`m-2\` - margin
- \`bg-blue-500\` - background color
- \`text-lg\` - text size
- \`flex\` - flexbox
- \`grid\` - grid layout`,
      `Tailwind's responsive design is incredibly simple:

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
\`\`\`

**Breakpoints:**
- \`sm:\` - 640px
- \`md:\` - 768px
- \`lg:\` - 1024px
- \`xl:\` - 1280px
- \`2xl:\` - 1536px

**Dark Mode:**
\`\`\`html
<div class="bg-white dark:bg-gray-900">
  Switches in dark mode!
</div>
\`\`\`

Tailwind makes responsive and theming trivial!`
    ]
  }
];

const fallbackResponses = [
  "That's an interesting question! As a demo AI, I can provide general information but don't have access to real-time data or advanced reasoning. How can I help you with web development or programming concepts?",
  "I'd be happy to discuss that topic! This is a prototype interface, so my responses are simulated. What specific aspect would you like to know more about?",
  "Great question! While I'm a frontend demo without real AI capabilities, I can still provide helpful information about common programming topics. What would you like to explore?",
  "I appreciate your interest! As a demonstration chatbot, I'm best suited for discussions about web development, React, TypeScript, and related technologies. What can I help you with?",
];

export function generateMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Find matching response
  for (const responseGroup of mockResponses) {
    const hasKeyword = responseGroup.keywords.some(keyword => 
      lowerMessage.includes(keyword)
    );

    if (hasKeyword) {
      // Return random response from the group
      const randomIndex = Math.floor(Math.random() * responseGroup.responses.length);
      return responseGroup.responses[randomIndex];
    }
  }

  // Return random fallback
  const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
  return fallbackResponses[randomIndex];
}

// Simulate API latency
export function simulateLatency(): Promise<void> {
  const delay = 300 + Math.random() * 700; // 300-1000ms
  return new Promise(resolve => setTimeout(resolve, delay));
}
