import React from 'react';
import { QueryResult } from '../utils/prologEngine';

interface ResultDisplayProps {
  result: QueryResult | null;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        <pre className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
          Results will appear here...
        </pre>
      </div>
    );
  }

  const { solutions, error } = result;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      {error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg font-mono text-sm">
          {error}
        </div>
      ) : solutions.length > 0 ? (
        <pre className="bg-gray-50 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
          {solutions.join('\n')}
        </pre>
      ) : (
        <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg font-mono text-sm">
          No solutions found.
        </div>
      )}
    </div>
  );
}