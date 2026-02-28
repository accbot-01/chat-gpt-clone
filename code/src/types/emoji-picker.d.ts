import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'emoji-picker': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          class?: string;
          'onEmoji-click'?: (event: any) => void;
        },
        HTMLElement
      >;
    }
  }
}

export {};
