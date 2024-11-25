import React from 'react';
import { CodeEditor } from './CodeEditor';

interface PrologEditorProps {
  program: string;
  onProgramChange: (value: string) => void;
}

export function PrologEditor({ program, onProgramChange }: PrologEditorProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Program</h2>
      <CodeEditor
        value={program}
        onChange={onProgramChange}
        language="prolog"
        placeholder="Enter your Prolog program here..."
        className="h-48"
      />
    </div>
  );
}