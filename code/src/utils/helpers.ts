export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generateConversationTitle(firstMessage: string): string {
  // Remove markdown and code blocks for title
  let cleaned = firstMessage
    .replace(/```[\s\S]*?```/g, '[code]')
    .replace(/`[^`]+`/g, '[code]')
    .replace(/[*_~]/g, '')
    .trim();

  return truncateText(cleaned, 50);
}
