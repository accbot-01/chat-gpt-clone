# Round 3: Comprehensive Test Case Library

**Project:** ChatGPT Clone (proj-1772262946)  
**Created:** February 28, 2026  
**Purpose:** Complete test case library for post-deployment verification  
**Estimated Execution Time:** 2-3 hours (full suite)

---

## Test Suite Overview

| Category | Test Cases | Priority | Status |
|----------|-----------|----------|--------|
| **Core Messaging** | TC-001 to TC-015 | CRITICAL | ⏸️ Blocked |
| **Conversation Management** | TC-016 to TC-030 | HIGH | ⏸️ Blocked |
| **Input Handling** | TC-031 to TC-045 | HIGH | ⏸️ Blocked |
| **UI/UX Elements** | TC-046 to TC-060 | MEDIUM | ⏸️ Blocked |
| **Responsive Design** | TC-061 to TC-075 | MEDIUM | ⏸️ Blocked |
| **State Persistence** | TC-076 to TC-090 | HIGH | ⏸️ Blocked |
| **Edge Cases** | TC-091 to TC-105 | LOW | ⏸️ Blocked |
| **Accessibility** | TC-106 to TC-115 | MEDIUM | ⏸️ Blocked |
| **Performance** | TC-116 to TC-120 | LOW | ⏸️ Blocked |

**Total Test Cases:** 120  
**Blocked Reason:** Deployment mismatch (Issue #1)

---

## Prerequisites

**Before Running Test Suite:**
1. ✅ Deployment Issue #1 resolved (code pushed to GitHub)
2. ✅ Netlify rebuild completed
3. ✅ Visual verification: button color is green (#10a37f), not blue
4. ✅ Text verification: sidebar says "Conversations", not "ChatGPT Clone"
5. ✅ Fresh browser session (clear localStorage/sessionStorage)

**Test Environment:**
- **URL:** https://chat-gpt-c.netlify.app/
- **Browsers:** Chrome (primary), Firefox, Safari (compatibility testing)
- **Devices:** Desktop (1920x1080), Tablet (768px), Mobile (375px)
- **Network:** Fast connection (for baseline), throttled 3G (for performance)

---

## 📋 Category 1: Core Messaging (CRITICAL)

### TC-001: Send First Message in New Conversation
**Priority:** 🔴 CRITICAL  
**Linked Bug:** Bug #1, Bug #5

**Steps:**
1. Load site with fresh session
2. Verify empty state displayed
3. Type message: "Hello, this is my first message"
4. Press Enter
5. Wait 2 seconds

**Expected:**
- Message appears right-aligned in chat
- Simulated response appears left-aligned
- Conversation created in sidebar
- Sidebar shows message preview

**Pass Criteria:** All expected outcomes occur  
**Fail Criteria:** Message disappears OR no conversation created

---

### TC-002: Send Second Message in Same Conversation
**Priority:** 🔴 CRITICAL

**Prerequisites:** TC-001 passed

**Steps:**
1. After TC-001, verify conversation active
2. Type message: "This is my second message"
3. Press Enter
4. Wait 2 seconds

**Expected:**
- New message appears in same conversation
- Another simulated response generated
- Conversation title remains same in sidebar
- Messages stack chronologically

**Pass Criteria:** Message sends and conversation continues  
**Fail Criteria:** New conversation created OR message fails to send

---

### TC-003: Send Long Message (500 characters)
**Priority:** 🟡 HIGH

**Steps:**
1. Open new conversation
2. Type 500-character message (Lorem ipsum...)
3. Press Enter

**Expected:**
- Full message displays without truncation
- Text wraps properly within message bubble
- No horizontal scrolling
- Simulated response generated

---

### TC-004: Send Message with Special Characters
**Priority:** 🟡 HIGH

**Test Data:**
```
Message: "Testing special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?`~"
```

**Expected:**
- All characters display correctly
- No HTML injection
- No XSS vulnerability
- Response generated normally

---

### TC-005: Send Message with Emojis
**Priority:** 🟡 HIGH

**Test Data:**
```
Message: "Testing emojis: 😀 🎉 ❤️ 🔥 👍 🚀"
```

**Expected:**
- Emojis render correctly
- Message formatting preserved
- Response generated normally

---

### TC-006: Send Message with Code Block
**Priority:** 🟢 MEDIUM

**Test Data:**
```
Message: "Here's code: `const x = 10;` and more text"
```

**Expected:**
- Inline code renders with distinct styling
- Monospace font applied
- Background highlight visible

---

### TC-007: Send Message with Markdown Bold
**Priority:** 🟢 MEDIUM

**Test Data:**
```
Message: "This has **bold text** and *italic text*"
```

**Expected:**
- Bold and italic render correctly
- Markdown processed in assistant response
- User message may show raw or processed (per design)

---

### TC-008: Send Empty Message (Should Fail)
**Priority:** 🟡 HIGH

**Steps:**
1. Click into input field
2. Press Enter without typing

**Expected:**
- Nothing happens
- Send button remains disabled
- No error message needed

---

### TC-009: Send Whitespace-Only Message (Should Fail)
**Priority:** 🟡 HIGH

**Steps:**
1. Type only spaces: "     "
2. Press Enter

**Expected:**
- Message rejected OR whitespace trimmed
- No empty message sent
- Input cleared or whitespace remains

---

### TC-010: Send Message with Link
**Priority:** 🟢 MEDIUM

**Test Data:**
```
Message: "Check this: https://example.com"
```

**Expected:**
- Link displays as text (not clickable in user message)
- Assistant response may render clickable links
- No auto-navigation

---

### TC-011: Streaming Response Animation
**Priority:** 🟢 MEDIUM

**Steps:**
1. Send any message
2. Observe assistant response appearance

**Expected:**
- Response appears gradually (typing effect)
- Cursor/loading indicator visible during streaming
- Animation smooth (no flicker)

---

### TC-012: Rapid Message Sending
**Priority:** 🟡 HIGH

**Steps:**
1. Send message: "Test 1"
2. Immediately send: "Test 2"
3. Immediately send: "Test 3"

**Expected:**
- All 3 messages appear
- Responses generated for each
- No race conditions
- Messages remain in order

---

### TC-013: Send Message During Response Streaming
**Priority:** 🟢 MEDIUM

**Steps:**
1. Send message: "First message"
2. While response is streaming, type and send: "Second message"

**Expected:**
- First response completes before second starts
- OR: Both responses process (per design)
- No message loss

---

### TC-014: Message Timestamp Display
**Priority:** 🟢 MEDIUM

**Steps:**
1. Send message
2. Check timestamp displayed

**Expected:**
- Timestamp appears (e.g., "just now", "2 mins ago")
- Timestamp updates over time
- Format consistent across messages

---

### TC-015: Message Scrolling (Long Conversation)
**Priority:** 🟡 HIGH

**Steps:**
1. Send 20 messages to create long conversation
2. Verify scroll behavior

**Expected:**
- Auto-scroll to latest message
- Scroll bar appears when needed
- Smooth scrolling animation
- Can manually scroll up

---

## 📋 Category 2: Conversation Management (HIGH PRIORITY)

### TC-016: New Chat Button Creates Conversation
**Priority:** 🔴 CRITICAL

**Steps:**
1. Start with active conversation
2. Click "New Chat" button in sidebar
3. Verify new conversation created

**Expected:**
- Previous conversation preserved in sidebar
- Empty state displayed in main area
- Ready to accept first message in new conversation

---

### TC-017: Switch Between Conversations
**Priority:** 🔴 CRITICAL

**Steps:**
1. Create 3 conversations with messages
2. Click first conversation in sidebar
3. Click second conversation
4. Click third conversation

**Expected:**
- Correct conversation loads each time
- Message history preserved
- No data loss

---

### TC-018: Delete Conversation
**Priority:** 🟡 HIGH

**Steps:**
1. Create conversation
2. Hover over conversation in sidebar
3. Click delete (trash) icon
4. Confirm deletion (if prompted)

**Expected:**
- Conversation removed from sidebar
- Main area shows next conversation OR empty state
- Deleted conversation unrecoverable

---

### TC-019: Delete Last Conversation
**Priority:** 🟡 HIGH

**Steps:**
1. Have only one conversation
2. Delete it

**Expected:**
- Sidebar shows "No conversations yet"
- Empty state displayed in main area
- "New Chat" button available

---

### TC-020: Conversation Sorting (Newest First)
**Priority:** 🟢 MEDIUM

**Steps:**
1. Create 5 conversations at different times
2. Check sidebar order

**Expected:**
- Most recent conversation at top
- Oldest at bottom
- Order updates when conversation is active

---

### TC-021: Conversation Title Generation
**Priority:** 🟡 HIGH

**Steps:**
1. Send first message: "What is machine learning?"
2. Check sidebar conversation title

**Expected:**
- Title shows truncated first message
- Max ~50 characters with ellipsis
- Updates if first message is edited (if supported)

---

### TC-022: Empty Conversation List State
**Priority:** 🟢 MEDIUM

**Steps:**
1. Clear all conversations
2. View sidebar

**Expected:**
- "No conversations yet" message
- "Start a new chat to begin" subtitle
- No empty list elements

---

### TC-023: Conversation List Scrolling (100 Conversations)
**Priority:** 🔵 LOW

**Steps:**
1. (Simulate) Create 100 conversations
2. Scroll conversation list

**Expected:**
- Smooth scrolling
- No performance degradation
- Virtualization if needed (optional)

---

### TC-024: Active Conversation Highlight
**Priority:** 🟢 MEDIUM

**Steps:**
1. Create 3 conversations
2. Click each one

**Expected:**
- Active conversation highlighted in sidebar
- Different background color or border
- Clear visual distinction

---

### TC-025: Conversation Hover Effects
**Priority:** 🔵 LOW

**Steps:**
1. Hover over conversations in sidebar

**Expected:**
- Delete button appears on hover
- Background color changes slightly
- Smooth transition animation

---

### TC-026 to TC-030: (Additional Conversation Tests)
- TC-026: Conversation selection keyboard navigation
- TC-027: Conversation title too long handling
- TC-028: Conversation with only assistant messages (edge case)
- TC-029: Conversation persistence across page reload
- TC-030: Conversation timestamp accuracy

---

## 📋 Category 3: Input Handling (HIGH PRIORITY)

### TC-031: Multi-line Input (Shift+Enter)
**Priority:** 🔴 CRITICAL  
**Linked Bug:** Bug #2

**Steps:**
1. Click input field
2. Type: "Line 1"
3. Press Shift+Enter
4. Type: "Line 2"
5. Press Shift+Enter
6. Type: "Line 3"
7. Press Enter to send

**Expected:**
- 3 lines appear in input field
- Line breaks preserved when sent
- Message displays with proper line breaks

**Pass Criteria:** Multi-line message sends correctly  
**Fail Criteria:** Shift+Enter sends message OR line breaks lost

---

### TC-032: Input Auto-resize (Vertical Growth)
**Priority:** 🟡 HIGH

**Steps:**
1. Type long multi-line message (10 lines)
2. Observe input field height

**Expected:**
- Input grows vertically to accommodate lines
- Max height reached, then scrollable
- No text hidden initially

---

### TC-033: Input Placeholder Text
**Priority:** 🟢 MEDIUM

**Steps:**
1. Load fresh page
2. Observe input field

**Expected:**
- Placeholder: "Type your message... (Enter to send, Shift+Enter for new line)"
- Placeholder disappears when typing
- Placeholder reappears when empty

---

### TC-034: Input Character Limit (If Applicable)
**Priority:** 🟡 HIGH

**Steps:**
1. Type 10,000 character message
2. Attempt to send

**Expected:**
- Either: No limit (sends successfully)
- Or: Limit enforced with visual indicator
- No crash or freeze

---

### TC-035: Emoji Picker Button
**Priority:** 🟢 MEDIUM

**Steps:**
1. Click emoji picker button (smiley icon)
2. Select emoji
3. Send message

**Expected:**
- Emoji picker modal/popover appears
- Emoji inserted at cursor position
- Picker closes after selection

---

### TC-036: Emoji Picker Keyboard Navigation
**Priority:** 🔵 LOW

**Steps:**
1. Open emoji picker
2. Use arrow keys to navigate
3. Press Enter to select

**Expected:**
- Keyboard navigation works
- Accessible via Tab key
- ESC closes picker

---

### TC-037: Send Button Click (Alternative to Enter)
**Priority:** 🟡 HIGH

**Steps:**
1. Type message
2. Click send button (paper plane icon) instead of pressing Enter

**Expected:**
- Message sends same as pressing Enter
- Button visual feedback (click animation)

---

### TC-038: Send Button Disabled When Empty
**Priority:** 🟡 HIGH

**Steps:**
1. Observe send button when input empty
2. Type text
3. Clear text

**Expected:**
- Button gray/disabled when empty
- Button enabled when text present
- Button disabled again when cleared

---

### TC-039: Input Focus on Page Load
**Priority:** 🔵 LOW

**Steps:**
1. Load page
2. Check if input is focused

**Expected:**
- Input auto-focused (cursor blinking)
- OR: User must click to focus (acceptable)

---

### TC-040: Input Paste (Cmd/Ctrl+V)
**Priority:** 🟡 HIGH

**Steps:**
1. Copy text from external source
2. Paste into input field
3. Send message

**Expected:**
- Text pastes correctly
- Formatting preserved (if rich text)
- OR: Plain text only (acceptable)

---

### TC-041 to TC-045: (Additional Input Tests)
- TC-041: Input copy (Cmd/Ctrl+C)
- TC-042: Input cut (Cmd/Ctrl+X)
- TC-043: Input select all (Cmd/Ctrl+A)
- TC-044: Input undo/redo
- TC-045: Input during conversation switch

---

## 📋 Category 4: UI/UX Elements (MEDIUM PRIORITY)

### TC-046: Theme Toggle (Light/Dark Mode)
**Priority:** 🟢 MEDIUM

**Steps:**
1. Locate theme toggle in sidebar
2. Click to switch to dark mode
3. Click to switch back to light mode

**Expected:**
- Dark mode: Dark backgrounds, light text
- Light mode: Light backgrounds, dark text
- Smooth transition animation
- Preference saved (tested separately)

---

### TC-047: Hamburger Menu (Mobile)
**Priority:** 🔴 CRITICAL (Mobile)  
**Linked Bug:** Bug #4

**Steps:**
1. Resize browser to mobile width (< 768px)
2. Click hamburger menu icon
3. Verify sidebar opens

**Expected:**
- Sidebar slides in from left
- Overlay appears behind
- Can click overlay to close

---

### TC-048: Sidebar Collapse/Expand (Desktop)
**Priority:** 🟡 HIGH

**Steps:**
1. Desktop view (> 768px)
2. Verify sidebar always visible
3. Resize to tablet/mobile
4. Verify sidebar collapses

**Expected:**
- Desktop: Sidebar persistent
- Mobile: Sidebar hidden, hamburger available

---

### TC-049: Skip to Content Link (Accessibility)
**Priority:** 🟢 MEDIUM

**Steps:**
1. Tab from page load
2. First focusable element should be "Skip to main content"

**Expected:**
- Skip link appears on focus
- Clicking skips to message input
- Meets WCAG 2.1 AA standards

---

### TC-050: Message Copy Button
**Priority:** 🔵 LOW

**Steps:**
1. Send message
2. Hover over message
3. Click copy icon (if present)

**Expected:**
- Message text copied to clipboard
- Visual confirmation (e.g., "Copied!")

---

### TC-051 to TC-060: (Additional UI Tests)
- TC-051: Conversation delete confirmation modal
- TC-052: Empty state icon animation
- TC-053: Loading spinner during response
- TC-054: Sidebar resize handle (if present)
- TC-055: Tooltip on hover (buttons)
- TC-056: Logo/branding display
- TC-057: Footer links/info
- TC-058: Version number display (if applicable)
- TC-059: Error boundary UI (if error occurs)
- TC-060: Offline mode indicator (if supported)

---

## 📋 Category 5: Responsive Design (MEDIUM PRIORITY)

### TC-061: Desktop Layout (1920x1080)
**Priority:** 🟡 HIGH

**Steps:**
1. Resize browser to 1920x1080
2. Verify layout

**Expected:**
- Sidebar visible (300px wide)
- Main chat area takes remaining space
- No horizontal scroll
- All elements properly sized

---

### TC-062: Laptop Layout (1366x768)
**Priority:** 🟡 HIGH

**Steps:**
1. Resize to 1366x768
2. Verify layout adapts

**Expected:**
- Sidebar slightly narrower (if responsive)
- OR: Remains fixed width
- Content still readable

---

### TC-063: Tablet Layout (768x1024 portrait)
**Priority:** 🟡 HIGH  
**Linked Bug:** Bug #3

**Steps:**
1. Resize to 768px width
2. Check sidebar behavior

**Expected:**
- Sidebar collapses to hamburger menu
- Main chat full width
- Touch-friendly button sizes

---

### TC-064: Mobile Layout (375x667 - iPhone SE)
**Priority:** 🟡 HIGH  
**Linked Bug:** Bug #3, Bug #4

**Steps:**
1. Resize to 375px width
2. Test all interactions

**Expected:**
- Hamburger menu works
- Input field full width
- Messages wrap properly
- No text cutoff

---

### TC-065: Orientation Change (Mobile)
**Priority:** 🟢 MEDIUM

**Steps:**
1. Open on mobile
2. Rotate device (portrait → landscape)
3. Rotate back

**Expected:**
- Layout adapts smoothly
- No content loss
- Conversation state preserved

---

### TC-066 to TC-075: (Additional Responsive Tests)
- TC-066: Ultra-wide display (3440x1440)
- TC-067: Small tablet (600px width)
- TC-068: Large phone (414px width)
- TC-069: Zoom in (200%)
- TC-070: Zoom out (50%)
- TC-071: Sidebar scroll on small screen
- TC-072: Message area scroll on small screen
- TC-073: Input field size on mobile
- TC-074: Touch target sizes (min 44x44px)
- TC-075: Responsive images/icons

---

## 📋 Category 6: State Persistence (HIGH PRIORITY)

### TC-076: Conversation Persistence (Reload Page)
**Priority:** 🔴 CRITICAL

**Steps:**
1. Create conversation with 5 messages
2. Reload page (F5)
3. Verify conversation still visible

**Expected:**
- All conversations in sidebar
- Active conversation restored
- All messages visible
- Timestamps accurate

---

### TC-077: Theme Preference Persistence
**Priority:** 🟢 MEDIUM

**Steps:**
1. Toggle to dark mode
2. Reload page

**Expected:**
- Dark mode still active
- Stored in localStorage

---

### TC-078: Active Conversation Persistence
**Priority:** 🟡 HIGH

**Steps:**
1. Have 3 conversations
2. Select conversation #2
3. Reload page

**Expected:**
- Conversation #2 still active
- OR: Defaults to most recent (acceptable)

---

### TC-079: LocalStorage Limit Handling
**Priority:** 🔵 LOW

**Steps:**
1. (Simulate) Fill localStorage to ~5MB
2. Create new conversation

**Expected:**
- Warning message OR oldest conversation deleted
- No crash or data corruption

---

### TC-080: Clear Browser Data
**Priority:** 🟡 HIGH

**Steps:**
1. Create conversations
2. Clear browser data (localStorage)
3. Reload page

**Expected:**
- Empty state displayed
- No errors
- Can start fresh

---

### TC-081 to TC-090: (Additional Persistence Tests)
- TC-081: Multiple browser tabs (data sync)
- TC-082: Incognito/private mode behavior
- TC-083: Session timeout (if applicable)
- TC-084: Export conversation data (if supported)
- TC-085: Import conversation data (if supported)
- TC-086: Data migration (version upgrades)
- TC-087: Conversation order persistence
- TC-088: Draft message persistence
- TC-089: Scroll position persistence
- TC-090: Sidebar state persistence (collapsed/expanded)

---

## 📋 Category 7: Edge Cases (LOW PRIORITY)

### TC-091: Very Long Message (10,000 characters)
### TC-092: 1000 Messages in One Conversation
### TC-093: 500 Conversations Total
### TC-094: Message with Only Emojis
### TC-095: Message with Only Whitespace and Emojis
### TC-096: Rapid Theme Toggle (10x in 1 second)
### TC-097: Delete Conversation While Viewing It
### TC-098: Create Conversation While Response Streaming
### TC-099: Browser Back Button Behavior
### TC-100: Browser Forward Button Behavior
### TC-101: Network Disconnection During Streaming
### TC-102: Network Reconnection After Offline
### TC-103: Low Battery Mode (Mobile)
### TC-104: Device Sleep/Wake During Active Use
### TC-105: Browser Window Minimize/Restore

---

## 📋 Category 8: Accessibility (MEDIUM PRIORITY)

### TC-106: Keyboard Navigation (Tab)
**Priority:** 🟡 HIGH

**Steps:**
1. Load page
2. Press Tab repeatedly
3. Navigate entire interface

**Expected:**
- All interactive elements focusable
- Focus indicator visible
- Logical tab order

---

### TC-107: Screen Reader Compatibility
**Priority:** 🟡 HIGH

**Tools:** VoiceOver (Mac), NVDA (Windows), JAWS

**Expected:**
- All text read correctly
- Buttons have labels
- Landmarks properly defined

---

### TC-108: Keyboard Shortcuts
**Priority:** 🟢 MEDIUM

**Test:**
- Cmd/Ctrl+K: New chat (if supported)
- Cmd/Ctrl+Enter: Send message (if supported)
- ESC: Close modal/picker

---

### TC-109: Color Contrast (WCAG 2.1 AA)
**Priority:** 🟡 HIGH

**Tools:** Chrome DevTools → Lighthouse

**Expected:**
- Text contrast ratio ≥ 4.5:1
- Large text ≥ 3:1
- No contrast failures

---

### TC-110: Focus Management (Modals)
**Priority:** 🟢 MEDIUM

**Steps:**
1. Open emoji picker
2. Check focus trapped in modal
3. ESC closes and restores focus

---

### TC-111 to TC-115:
- TC-111: Alt text on images
- TC-112: ARIA labels on buttons
- TC-113: Semantic HTML structure
- TC-114: No keyboard traps
- TC-115: Zoom compatibility (up to 200%)

---

## 📋 Category 9: Performance (LOW PRIORITY)

### TC-116: Initial Load Time
**Expected:** < 3 seconds on fast connection

### TC-117: Time to Interactive
**Expected:** < 5 seconds

### TC-118: Message Send Latency
**Expected:** < 500ms (simulated response start)

### TC-119: Conversation Switch Speed
**Expected:** < 100ms

### TC-120: Memory Usage (Long Session)
**Test:** Use app for 1 hour, check RAM
**Expected:** < 200MB

---

## Test Execution Instructions

### 1. Pre-Test Setup
```bash
# Clear browser data
# Open Chrome DevTools
# Network tab: Online
# Console: Open for error monitoring
```

### 2. Execution Order
1. ✅ Run critical tests first (TC-001 to TC-020)
2. ✅ Then high-priority tests
3. ✅ Medium/low-priority tests as time allows

### 3. Recording Results
For each test:
- ✅ PASS: Green checkmark, note time
- ❌ FAIL: Red X, screenshot, console errors, steps to reproduce
- ⚠️ PARTIAL: Note what worked/didn't work
- ⏸️ BLOCKED: Note blocking issue

### 4. Bug Reporting
If bug found:
- Screenshot + video if possible
- Browser console log
- Network tab (if relevant)
- Clear reproduction steps
- Severity assessment

---

## Summary

**Total Test Cases:** 120  
**Estimated Time:** 2-3 hours (full suite)  
**Coverage:**
- ✅ All FSD acceptance criteria
- ✅ All previous bug regressions
- ✅ Responsive design
- ✅ Accessibility basics
- ✅ Edge cases

**Post-Deployment Action:**  
Once Issue #1 (deployment mismatch) is resolved, execute this suite and create FINAL-REPORT.md with results.

---
**Test Library Version:** 1.0  
**Next Update:** After Round 4 execution
