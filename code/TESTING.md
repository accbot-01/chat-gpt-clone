# Testing Checklist - ChatGPT Clone

## Manual Testing Scenarios

### 1. Message Sending & Streaming
- [ ] Type message and press Enter → Message appears
- [ ] Type message and click Send button → Message appears
- [ ] Press Shift+Enter → New line inserted (message NOT sent)
- [ ] Empty input → Send button disabled/no action
- [ ] AI response streams character-by-character
- [ ] Streaming is smooth (no flickering)
- [ ] Multiple messages in sequence work correctly

### 2. Stop Generation
- [ ] Click Stop while AI is streaming → Streaming halts immediately
- [ ] Partial response remains visible after stop
- [ ] Copy/Regenerate buttons appear after stop

### 3. Copy Message
- [ ] Click Copy on AI message → Content copied to clipboard
- [ ] "Copied!" confirmation appears
- [ ] Paste in external app → Content matches
- [ ] Markdown formatting preserved (or converted to plain text)

### 4. Regenerate Response
- [ ] Click Regenerate → New response generated
- [ ] Old response replaced (or marked replaced)
- [ ] New response streams in
- [ ] Multiple regenerations work (different responses if available)

### 5. Conversation Management
- [ ] Click "New Chat" → New empty conversation created
- [ ] New conversation appears at top of sidebar
- [ ] Send first message → Conversation title auto-generated from message
- [ ] Title truncated if > 50 characters
- [ ] Switch between conversations → Correct messages load

### 6. Rename Conversation
- [ ] Hover over conversation → Edit icon appears
- [ ] Click Edit → Inline text input appears
- [ ] Type new title → Press Enter → Title updates
- [ ] Press Escape → Edit cancelled, original title remains
- [ ] Renamed title persists after page refresh

### 7. Delete Conversation
- [ ] Hover over conversation → Delete icon appears
- [ ] Click Delete → Confirmation dialog appears
- [ ] Click Cancel → Conversation remains
- [ ] Click Delete/Yes → Conversation removed from sidebar
- [ ] Deleted conversation removed from localStorage
- [ ] If deleted conversation was active → Another conversation loads (or empty state)

### 8. Dark Mode Toggle
- [ ] Click theme toggle → Theme switches (dark ↔ light)
- [ ] All components respect theme (sidebar, chat, input)
- [ ] Theme preference persists after page refresh
- [ ] Theme transition is smooth (animated)

### 9. Emoji Picker
- [ ] Click emoji button → Emoji picker appears
- [ ] Click emoji → Emoji inserted at cursor position
- [ ] Emoji appears in input field
- [ ] Send message with emoji → Emoji visible in sent message
- [ ] Click outside picker → Picker closes

### 10. Markdown Rendering
- [ ] Bold text (`**bold**`) → Renders bold
- [ ] Italic text (`*italic*`) → Renders italic
- [ ] Inline code (`` `code` ``) → Monospace with background
- [ ] Bulleted list → Proper bullets and indentation
- [ ] Numbered list → Proper numbering
- [ ] Links (`[text](url)`) → Clickable, opens in new tab
- [ ] Headings (`# H1`, `## H2`) → Proper sizing and weight

### 11. Code Syntax Highlighting
- [ ] Code block with language (` ```javascript `) → Syntax highlighted
- [ ] Keywords, strings, comments have distinct colors
- [ ] Code block without language → Monospace, generic styling
- [ ] Long code lines → Horizontal scroll appears
- [ ] Hover over code block → "Copy Code" button appears
- [ ] Click "Copy Code" → Code copied to clipboard

### 12. Responsive - Mobile (< 768px)
- [ ] Sidebar hidden by default
- [ ] Hamburger menu icon visible (top-left)
- [ ] Click hamburger → Sidebar slides in from left
- [ ] Sidebar overlays chat area
- [ ] Click outside sidebar → Sidebar closes
- [ ] Select conversation → Sidebar closes, conversation loads
- [ ] Input field expands properly on mobile keyboard
- [ ] Send button is large enough for touch (min 44x44px)
- [ ] Emoji picker opens as bottom sheet (or scrollable)

### 13. Responsive - Tablet (768px - 1024px)
- [ ] Sidebar always visible
- [ ] Chat area uses remaining space
- [ ] Layout does not break

### 14. Responsive - Desktop (> 1024px)
- [ ] Sidebar fixed at 280px width
- [ ] Chat area centered, max-width 768px
- [ ] All interactions smooth

### 15. localStorage Persistence
- [ ] Create conversation → Refresh page → Conversation still there
- [ ] Send messages → Refresh → Messages intact
- [ ] Change theme → Refresh → Theme persisted
- [ ] Close browser, return later → Data still there
- [ ] Clear browser data → All conversations gone (expected)

### 16. Auto-scroll
- [ ] Send message → Chat scrolls to bottom
- [ ] AI response streaming → Chat scrolls to keep streaming visible
- [ ] Scroll animation is smooth

### 17. Empty State
- [ ] No conversations → "How can I help you today?" message shows
- [ ] "Start a conversation" prompt visible
- [ ] First message sent → Empty state disappears

### 18. Keyboard Shortcuts
- [ ] Enter (no Shift) → Sends message
- [ ] Shift + Enter → New line
- [ ] Tab → Navigates through interactive elements
- [ ] Escape while renaming → Cancels rename

### 19. Edge Cases
- [ ] Very long message (1000+ characters) → Handles gracefully
- [ ] Message with only emojis → Displays correctly
- [ ] Message with special characters (`<>{}[]`) → No XSS, displays safely
- [ ] Spam clicking Send → No duplicate messages
- [ ] Rapidly switching conversations → No state corruption
- [ ] localStorage full → Warning appears, app still functions

### 20. Performance
- [ ] Initial page load < 3 seconds (3G)
- [ ] Switching conversations is instant
- [ ] No lag during streaming
- [ ] Smooth animations (60 FPS)
- [ ] No memory leaks (use Chrome DevTools)

## Automated Tests (Optional)

### Unit Tests
```bash
npm run test
```

Test coverage:
- [ ] `generateMockResponse()` returns correct response for keywords
- [ ] `streamResponse()` yields words sequentially
- [ ] `formatTimestamp()` returns correct relative time
- [ ] `generateId()` returns unique IDs
- [ ] `truncateText()` truncates at specified length

### Integration Tests
- [ ] Send message flow (user message → streaming → complete)
- [ ] Conversation CRUD operations
- [ ] Theme toggle flow

### Accessibility (WCAG 2.1 AA)
- [ ] Lighthouse Accessibility Score: 90+
- [ ] All interactive elements keyboard navigable
- [ ] Focus indicators visible
- [ ] ARIA labels on icon buttons
- [ ] Color contrast ratio 4.5:1 minimum
- [ ] Screen reader announces messages

### Browser Compatibility
Test on:
- [ ] Chrome 90+ (Windows, macOS, Linux)
- [ ] Firefox 88+
- [ ] Safari 14+ (macOS, iOS)
- [ ] Edge 90+
- [ ] Chrome Mobile (Android 10+)
- [ ] Safari Mobile (iOS 14+)

### Lighthouse Audit
```bash
npm run build
npx serve dist
# Open Chrome DevTools → Lighthouse → Run audit
```

Target scores:
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 95+
- [ ] SEO: 90+

## Security Tests

### XSS Prevention
- [ ] Type `<script>alert('XSS')</script>` → Renders as text, no alert
- [ ] Markdown with HTML → Sanitized (no HTML execution)
- [ ] Emoji with special chars → No injection

### Data Privacy
- [ ] localStorage contains no sensitive data (API keys, passwords)
- [ ] No external API calls (mock backend only)

## Bug Report Template

```markdown
**Bug Title:**

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**

**Actual Behavior:**

**Environment:**
- Browser: 
- OS: 
- Screen size: 

**Screenshots/Video:**

**Severity:** Critical / High / Medium / Low

**Suggested Fix:**
```

## Sign-Off Criteria

All items checked = ✅ **PASS** → Ready for Production  
Any critical bugs found = ❌ **FAIL** → Return to Developer Agent
