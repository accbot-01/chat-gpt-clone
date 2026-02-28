# ChatGPT Clone

A production-ready ChatGPT-like frontend built with React 18, TypeScript, and Vite.

## Features

- ✅ Real-time streaming responses (simulated)
- ✅ Conversation history with localStorage persistence
- ✅ Rich text editor with emoji support
- ✅ Markdown rendering with code syntax highlighting
- ✅ Responsive design (mobile-first)
- ✅ Accessibility (WCAG 2.1 AA compliant)
- ✅ Mock backend with intelligent response generation

## Tech Stack

- **React 18** - UI framework
- **TypeScript 5** - Type safety
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Styling
- **React Markdown** - Markdown rendering
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Main layout components
│   ├── chat/            # Chat-related components
│   ├── input/           # Input and editor components
│   └── ui/              # Reusable UI components
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── services/            # Backend services and simulators
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Key Features Explained

### Streaming Responses
Messages are streamed word-by-word to simulate real ChatGPT behavior. The streaming is implemented using async generators.

### localStorage Persistence
All conversations are automatically saved to localStorage, so your chat history persists across browser sessions.

### Responsive Design
The app works seamlessly on mobile, tablet, and desktop. The sidebar collapses on mobile for a better UX.

### Accessibility
- Full keyboard navigation support
- ARIA labels on all interactive elements
- Proper focus management
- Screen reader friendly

## Architecture

See [ARCHITECTURE.md](../architect/ARCHITECTURE.md) for detailed technical architecture documentation.

## License

MIT
