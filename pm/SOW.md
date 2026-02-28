# Statement of Work (SOW)
## ChatGPT Clone - Interactive Chat Interface

**Project ID:** chatgpt-clone-20260228  
**Document Version:** 1.0  
**Date:** February 28, 2026  
**Prepared By:** PM Agent  
**Client:** Adwait Rane

---

## 1. Project Overview

This Statement of Work defines the scope, deliverables, timeline, and responsibilities for the development of a ChatGPT frontend clone. The application will replicate all major ChatGPT features using React, with hardcoded mock responses and no backend dependencies.

---

## 2. Scope of Work

### 2.1 Deliverables

| # | Deliverable | Description | Owner |
|---|-------------|-------------|-------|
| 1 | **React Application** | Fully functional chat interface with all features | Developer Agent |
| 2 | **Chat Interface** | Message thread with user/AI messages, avatars, timestamps | Developer Agent |
| 3 | **Streaming Animation** | Character-by-character text simulation | Developer Agent |
| 4 | **Rich Text Editor** | Input with bold, italic, code, emoji support | Developer Agent |
| 5 | **Sidebar Navigation** | Conversation history, new/rename/delete actions | Developer Agent |
| 6 | **Markdown Renderer** | AI responses with formatted text, lists, links | Developer Agent |
| 7 | **Code Syntax Highlighting** | Multi-line code blocks with language-specific colors | Developer Agent |
| 8 | **Action Buttons** | Copy, Regenerate, Stop generation | Developer Agent |
| 9 | **Dark Mode** | Light/dark theme toggle with persistence | Developer Agent |
| 10 | **Mobile Responsive** | Touch-friendly UI for phones/tablets | Developer Agent |
| 11 | **localStorage Persistence** | Conversations + theme saved locally | Developer Agent |
| 12 | **Mock Response System** | JSON-based hardcoded AI responses | Developer Agent |
| 13 | **Documentation** | README with setup, features, customization guide | Developer Agent |
| 14 | **Test Report** | QA results from 5-gate testing process | Tester Agent |

### 2.2 Technical Deliverables

**Frontend:**
- React 18+ application
- React Router v6+ (for future multi-page expansion)
- State management (Context API or Zustand/Redux if needed)
- Rich text editor (Lexical, Slate, or Quill)
- Markdown renderer (react-markdown or marked)
- Code syntax highlighter (Prism.js or Highlight.js)
- Tailwind CSS for styling
- Responsive design (mobile 320px+, tablet 768px+, desktop 1024px+)

**Build & Deployment:**
- Vite build configuration
- Vercel deployment configuration
- Production-optimized build (code splitting, lazy loading)

**Data:**
- Mock responses JSON file
- localStorage schema for conversations + settings

**Code Quality:**
- ESLint + Prettier configuration
- Component-based architecture
- TypeScript (optional but recommended)
- No console errors/warnings in production

---

## 3. Timeline & Milestones

| Phase | Duration | Deliverable | Gate |
|-------|----------|-------------|------|
| **Phase 1: Requirements** | Complete | BRD + SOW + FSD | ✅ Client approval |
| **Phase 2: Architecture** | 2-3 days | Technical design, component architecture | Client approval |
| **Phase 3: Development (Core)** | 5-7 days | Chat interface, streaming, basic sidebar | Code review |
| **Phase 4: Development (Advanced)** | 4-6 days | RTE, markdown, code highlighting, actions | Code review |
| **Phase 5: Testing** | 3-4 days | QA report (5-gate process), bug fixes | All tests pass |
| **Phase 6: Deployment** | 1 day | Live site on Vercel | Client acceptance |

**Total Estimated Timeline:** 15-21 business days

---

## 4. Roles & Responsibilities

### Client (Adwait Rane)
- Provide approval at each gate
- Provide feedback on UI/UX (especially during dev)
- Approve final deployment
- Provide sample mock responses if desired

### PM Agent
- Requirements gathering and documentation
- Stakeholder communication
- Gate approval coordination

### Architect Agent
- Technical design and component architecture
- Library/framework recommendations
- State management strategy
- Performance optimization plan

### Developer Agent
- Code implementation (2 phases: core + advanced)
- Unit/integration testing
- Documentation
- Mock response system setup

### Tester Agent
- Quality assurance (5-gate process)
- Cross-browser testing
- Mobile device testing
- Bug reporting and regression testing

---

## 5. Technical Requirements

### 5.1 Technology Stack
- **Frontend:** React 18+
- **Routing:** React Router v6+ (optional, for future expansion)
- **State Management:** Context API or Zustand (avoid Redux unless needed)
- **Rich Text Editor:** Lexical (React-first, recommended) or Slate/Quill
- **Markdown:** react-markdown + remark-gfm (GitHub Flavored Markdown)
- **Syntax Highlighting:** Prism.js or Highlight.js
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Deployment:** Vercel
- **Version Control:** Git (GitHub repository)

### 5.2 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### 5.3 Performance Targets
- Lighthouse Performance Score: 85+ (slightly lower due to rich interactivity)
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.5s
- Streaming animation: 60 FPS

### 5.4 Functional Requirements Summary

**Core Chat:**
- User can type and send messages
- AI responds with streaming text
- Messages display with user/AI avatars
- Timestamps on all messages

**Rich Text Editor:**
- Bold, italic, inline code formatting
- Emoji picker/support
- Multi-line input (Shift+Enter)
- Send with Enter key or button

**Streaming:**
- Character-by-character or word-by-word animation
- Smooth, no janky rendering
- "Stop" button during streaming

**Markdown Rendering:**
- Bold, italic, strikethrough
- Ordered/unordered lists
- Links (clickable, open in new tab)
- Inline code (`code`)
- Code blocks with syntax highlighting

**Code Blocks:**
- Language detection or manual specification
- Syntax highlighting (JS, Python, HTML, CSS, SQL, etc.)
- Copy code button
- Line numbers (optional)

**Actions:**
- Copy message to clipboard
- Regenerate response (loads new mock response)
- Stop generation (halts streaming mid-way)

**Sidebar:**
- List of past conversations (most recent first)
- Conversation title (auto-generated from first message)
- Hover actions: rename, delete
- "New Chat" button
- Collapsible on mobile
- Active conversation highlighted

**Dark Mode:**
- Toggle button (icon-based)
- Light and dark color schemes
- Smooth transition between themes
- Preference saved in localStorage

**Persistence:**
- Conversations saved in localStorage
- Theme preference saved
- Data survives page refresh
- Max storage warning if approaching limits

**Mobile:**
- Sidebar collapses into hamburger menu
- Touch-friendly buttons (min 44x44px)
- Swipe to open/close sidebar (optional)
- Responsive layout (no horizontal scroll)

---

## 6. Mock Response System

### 6.1 Requirements
- Responses stored in JSON file (e.g., `mockResponses.json`)
- Structure: `{ "query": "...", "response": "..." }` pairs
- Support for markdown in responses
- Support for code blocks in responses
- 20-30 sample Q&A pairs minimum

### 6.2 Response Matching
- Simple keyword matching or random selection
- If no match, return generic "I'm a demo AI" response
- Support for multiple responses per query (for regenerate feature)

### 6.3 Sample Response Types
- Short text answers
- Long multi-paragraph answers
- Answers with lists
- Answers with code blocks (JS, Python, HTML, CSS)
- Answers with links
- Answers with mixed formatting

---

## 7. Approval Gates

| Gate | Approver | Criteria |
|------|----------|----------|
| **Requirements Complete** | Client | BRD + SOW + FSD approved |
| **Architecture Approved** | Client | Technical design approved |
| **Core Dev Complete** | Tester Agent | Chat + streaming functional |
| **Advanced Dev Complete** | Tester Agent | RTE + markdown + actions work |
| **Testing Complete** | Client | All 5 gates pass, no critical bugs |
| **Deployment Complete** | Client | Site live and functional on Vercel |

---

## 8. Assumptions

1. Client is comfortable with localStorage (no cloud sync)
2. Hardcoded responses are acceptable for demo purposes
3. No user authentication needed
4. No custom domain required (vercel.app subdomain OK)
5. Client can approve milestones within 1 business day
6. WCAG accessibility is "nice to have" but not MVP requirement

---

## 9. Out of Scope

The following are explicitly **not included** in this SOW:

❌ Real backend API  
❌ Real AI model integration  
❌ User authentication/accounts  
❌ Cloud storage (conversations)  
❌ File uploads (images, PDFs)  
❌ Voice input/output  
❌ Export conversations  
❌ Search within conversations  
❌ Conversation folders/tags  
❌ Shared conversation links  
❌ Admin panel  
❌ Analytics/tracking  
❌ Multi-language support  
❌ Plugins/extensions  

---

## 10. Change Request Process

If the client requests changes outside this SOW:

1. Client submits written change request
2. PM Agent evaluates impact (scope, timeline, effort)
3. Updated SOW issued with revised timeline
4. Client approves updated SOW
5. Work resumes with new scope

---

## 11. Payment Terms

**This is a virtual team project — no payment terms apply.**  
(Section included for SOW completeness.)

---

## 12. Acceptance Criteria

The project is considered **complete** when:

✅ Chat interface functional with user/AI messages  
✅ Streaming text animation works smoothly  
✅ Rich text editor supports bold, italic, code, emojis  
✅ Sidebar displays conversation history  
✅ New chat, rename, delete actions work  
✅ Markdown rendering functional (bold, lists, links, code)  
✅ Code syntax highlighting works for common languages  
✅ Copy, Regenerate, Stop buttons functional  
✅ Dark mode toggle works, preference persists  
✅ Mobile responsive (tested on iOS/Android)  
✅ localStorage persistence works (conversations + theme)  
✅ Mock responses load correctly  
✅ Site deployed to Vercel and publicly accessible  
✅ Documentation (README) complete  
✅ All 5 QA gates pass (Tester Agent approval)  
✅ Client signs off on final delivery  

---

## 13. Signatures

**Client Approval:**

- [ ] **Adwait Rane** — _Date: __________

**PM Agent:**

- [x] **PM Agent** — _Date: February 28, 2026_

---

**Next Steps:**  
Upon client approval, this SOW will be handed to the Architect Agent for technical design.
