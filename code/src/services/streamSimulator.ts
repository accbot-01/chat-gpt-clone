export async function* streamResponse(text: string, speed: number = 20) {
  // Split by words for more natural streaming
  const words = text.split(' ');
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const isLast = i === words.length - 1;
    
    // Add space after word unless it's the last word
    yield word + (isLast ? '' : ' ');
    
    // Variable delay for more natural feel
    const baseDelay = speed;
    const randomDelay = Math.random() * 10;
    const delay = baseDelay + randomDelay;
    
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

export class StreamController {
  private aborted = false;

  abort() {
    this.aborted = true;
  }

  isAborted() {
    return this.aborted;
  }

  reset() {
    this.aborted = false;
  }
}
