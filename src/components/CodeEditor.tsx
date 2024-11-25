import React from 'react';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-prolog';
import Editor from 'react-simple-code-editor';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  placeholder?: string;
  className?: string;
}

export function CodeEditor({ 
  value, 
  onChange, 
  language = 'prolog',
  placeholder,
  className = ''
}: CodeEditorProps) {
  const highlightCode = (code: string) => {
    return highlight(code, languages[language] || languages.prolog, language);
  };

  return (
    <div className={`border rounded-lg overflow-auto bg-white ${className}`}>
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={highlightCode}
        padding={16}
        className="font-mono text-sm"
        placeholder={placeholder}
        style={{
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          minHeight: '100%'
        }}
      />
    </div>
  );
}