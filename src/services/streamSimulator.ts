export async function* streamResponse(text: string): AsyncGenerator<string, void, unknown> {
  const words = text.split(' ');
  
  for (const word of words) {
    yield word + ' ';
    // Simulate network delay (30-80ms per word for realistic feel)
    await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50));
  }
}
