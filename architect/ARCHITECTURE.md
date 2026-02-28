# ChatGPT Clone - Technical Architecture

**Project:** ChatGPT-like Frontend Clone  
**Project ID:** proj-1772262946  
**Date:** 2026-02-28  
**Status:** APPROVED - Ready for Development

---

## Executive Summary

This document defines the technical architecture for a production-ready ChatGPT clone frontend. The application is a single-page React application with simulated streaming responses, conversation management, and a rich text editor interface.

**Tech Stack:**
- React 18 + TypeScript 5
- Vite 5 (build tool)
- Tailwind CSS 3 (styling)
- Context API (state management)
- localStorage (persistence)

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     React Application                    │
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │   Sidebar      │  │  ChatArea    │  │  Input Bar  │ │
│  │  (Convos)      │  │  (Messages)  │  │  (RTE)      │ │
│  └────────────────┘  └──────────────┘  └─────────────┘ │
│           │                  │                 │         │
│           └──────────────────┼─────────────────┘         │
│                              │                           │
│                    ┌─────────▼──────────┐                │
│                    │  Context Providers │                │
│                    │  - Chat State      │                │
│                    │  - UI State        │                │
│                    └─────────┬──────────┘                │
│                              │                           │
│                    ┌─────────▼──────────┐                │
│                    │   Mock Backend     │                │
│                    │   (JSON responses) │                │
│                    └─────────┬──────────┘                │
│                              │                           │
│                    ┌─────────▼──────────┐                │
│                    │   localStorage      │                │
│                    │   (persistence)    │                │
│                    └────────────────────┘                │
└─────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           # Conversation list sidebar
│   │   ├── ChatArea.tsx          # Main chat message area
│   │   └── InputBar.tsx          # Rich text input + send button
│   ├── chat/
│   │   ├── Message.tsx           # Individual message bubble
│   │   ├── MessageList.tsx       # Scrollable message container
│   │   ├── StreamingIndicator.tsx # "AI is typing..." animation
│   │   └── ConversationItem.tsx  # Sidebar conversation entry
│   ├── input/
│   │   ├── RichTextEditor.tsx    # Multi-line input with emoji
│   │   ├── EmojiPicker.tsx       # Emoji selector popup
│   │   └── SendButton.tsx        # Submit button with icon
│   └── ui/
│       ├── Button.tsx            # Reusable button component
│       ├── IconButton.tsx        # Icon-only button
│       ├── Modal.tsx             # Dialog/modal wrapper
│       └── Tooltip.tsx           # Hover tooltip
├── context/
│   ├── ChatContext.tsx           # Chat state (messages, convos)
│   └── UIContext.tsx             # UI state (sidebar open, theme)
├── hooks/
│   ├── useChatStream.ts          # Simulated streaming logic
│   ├── useLocalStorage.ts        # localStorage persistence
│   └── useAutoScroll.ts          # Auto-scroll to bottom
├── services/
│   ├── mockBackend.ts            # Mock API responses
│   └── streamSimulator.ts        # Token-by-token streaming
├── types/
│   └── chat.types.ts             # TypeScript interfaces
├── utils/
│   ├── markdown.ts               # Markdown rendering
│   └── dateFormatter.ts          # Relative timestamps
├── App.tsx                       # Root component
└── main.tsx                      # Entry point
```

### Component Specifications

#### **Sidebar Component**
- Shows list of conversations (newest first)
- "New Chat" button at top
- Highlights active conversation
- Delete conversation button (trash icon)
- Collapsible on mobile

#### **ChatArea Component**
- Scrollable message list
- Auto-scrolls to bottom on new messages
- Shows streaming indicator when AI is "typing"
- Empty state: "Start a new conversation"

#### **Message Component**
- User messages: right-aligned, blue background
- AI messages: left-aligned, gray background
- Markdown rendering for code blocks, lists, bold/italic
- Copy button for code blocks
- Timestamp (relative: "2 min ago")

#### **InputBar Component**
- Multi-line textarea with auto-resize
- Emoji picker button
- Send button (disabled when empty)
- Keyboard shortcuts: Enter to send, Shift+Enter for newline

---

## State Management

### Chat Context

```typescript
interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  isStreaming: boolean;
  
  // Actions
  createConversation: () => void;
  deleteConversation: (id: string) => void;
  sendMessage: (content: string) => void;
  setActiveConversation: (id: string) => void;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
```

### UI Context

```typescript
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  
  // Actions
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}
```

---

## Mock Backend Architecture

### Response Generator

```typescript
// src/services/mockBackend.ts

const mockResponses = [
  "I'd be happy to help with that! Here's what you need to know...",
  "That's an interesting question. Let me break it down for you:",
  "Based on what you've described, I recommend...",
  // ... 20+ template responses
];

export function generateMockResponse(userMessage: string): string {
  // Simple keyword matching for demo purposes
  if (userMessage.toLowerCase().includes('code')) {
    return "Here's a code example:\n\n```javascript\nconst example = 'Hello World';\n```";
  }
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}
```

### Streaming Simulator

```typescript
// src/services/streamSimulator.ts

export async function* streamResponse(text: string) {
  const words = text.split(' ');
  
  for (const word of words) {
    yield word + ' ';
    await new Promise(resolve => setTimeout(resolve, 50)); // 50ms delay
  }
}
```

### Usage in Component

```typescript
const handleSendMessage = async (content: string) => {
  // Add user message
  addMessage({ role: 'user', content });
  
  // Generate mock response
  const responseText = generateMockResponse(content);
  
  // Stream it token by token
  let streamedContent = '';
  for await (const chunk of streamResponse(responseText)) {
    streamedContent += chunk;
    updateStreamingMessage(streamedContent);
  }
  
  finalizeMessage(streamedContent);
};
```

---

## Data Persistence

### localStorage Schema

```typescript
// Key: 'chatgpt-clone-conversations'
// Value: JSON array of Conversation objects

interface StoredData {
  conversations: Conversation[];
  activeConversationId: string | null;
  version: string; // for migrations
}
```

### Sync Strategy
- Save to localStorage after every message
- Load on app mount
- Debounce writes (300ms) to avoid excessive I/O

---

## Responsive Design

### Breakpoints (Tailwind)
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Behavior
- Sidebar hidden by default (hamburger menu to toggle)
- Messages full-width
- Input bar sticky at bottom
- Emoji picker opens as bottom sheet

### Desktop Behavior
- Sidebar always visible (280px wide)
- Chat area uses remaining space
- Input bar fixed at bottom of chat area

---

## Accessibility (WCAG 2.1 AA)

- **Keyboard Navigation:** Tab through all interactive elements
- **Screen Reader Support:** ARIA labels on all buttons/inputs
- **Focus Indicators:** Visible focus rings on all focusable elements
- **Color Contrast:** 4.5:1 minimum ratio
- **Semantic HTML:** Proper heading hierarchy

---

## Performance Targets

- **Initial Load:** < 2 seconds on 3G
- **Bundle Size:** < 300 KB (gzipped)
- **Time to Interactive:** < 3 seconds
- **Lighthouse Score:** 90+ (all categories)

---

## Developer Handoff

### Setup Commands

```bash
# Clone repo
git clone https://github.com/accbot-01/chat-gpt-clone.git
cd chat-gpt-clone

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Implementation Phases

**Phase 1: Core Layout (2 hours)**
- Set up Vite + React + TypeScript
- Create Sidebar, ChatArea, InputBar components
- Implement responsive grid layout

**Phase 2: Chat Functionality (3 hours)**
- Message component with markdown rendering
- Context API for chat state
- Mock backend + streaming simulator
- Send/receive message flow

**Phase 3: Persistence (1 hour)**
- localStorage integration
- Load/save conversations
- Handle edge cases (quota exceeded, corrupted data)

**Phase 4: Polish (2 hours)**
- Emoji picker integration
- Animations (message fade-in, typing indicator)
- Keyboard shortcuts
- Error handling
- Mobile responsive tweaks

**Phase 5: Testing & Deployment (1 hour)**
- Manual testing on all breakpoints
- Accessibility audit
- Performance testing
- Deploy to Vercel/Netlify

**Total Estimated Time: 9 hours**

---

## Failure Modes & Mitigations

### 1. localStorage Full
- **Mitigation:** Implement LRU eviction (delete oldest conversations)
- **Fallback:** Warn user, operate in memory-only mode

### 2. Large Message History
- **Mitigation:** Virtualized scrolling for >100 messages
- **Fallback:** Paginate old messages ("Load more")

### 3. Streaming Animation Lag
- **Mitigation:** Use requestAnimationFrame for smooth updates
- **Fallback:** Disable streaming, show full response at once

### 4. Emoji Picker Performance
- **Mitigation:** Lazy load emoji picker component
- **Fallback:** Use native emoji keyboard (mobile only)

---

## Security Considerations

- **XSS Prevention:** Sanitize markdown rendering (use DOMPurify)
- **localStorage Security:** Don't store sensitive data
- **No Backend Calls:** No risk of API key leakage

---

## Future Enhancements (Out of Scope)

- Real backend integration
- User authentication
- Voice input/output
- Image generation
- Conversation search
- Export conversations
- Custom system prompts

---

## Sign-Off

**Architecture Status:** ✅ APPROVED  
**Ready for Development:** YES  
**Estimated Completion:** 9 hours  
**Next Step:** Hand off to Developer Agent

---

**Questions?** Contact the Architect Agent for clarifications.
