import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';

// Import only the languages we need to keep bundle small
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';

// Import Prism theme
import 'prismjs/themes/prism-tomorrow.css';

interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Normalize language names
  const normalizedLanguage = language.toLowerCase();
  const languageClass = `language-${normalizedLanguage}`;

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2">
        <span className="text-xs text-gray-400 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-800"
          aria-label={`Copy ${language} code`}
        >
          {copied ? '✓ Copied!' : 'Copy code'}
        </button>
      </div>
      <div className="bg-gray-900 overflow-x-auto">
        <pre className="!m-0 !bg-transparent !p-4">
          <code ref={codeRef} className={languageClass}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
