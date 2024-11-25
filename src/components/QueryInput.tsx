import React from 'react';

interface QueryInputProps {
  query: string;
  onQueryChange: (value: string) => void;
  onRunQuery: () => void;
}

export function QueryInput({ query, onQueryChange, onRunQuery }: QueryInputProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Query</h2>
      <div className="flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="flex-1 p-2 border rounded-lg font-mono text-sm"
          placeholder="Enter your query here..."
        />
        <button
          onClick={onRunQuery}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Run Query
        </button>
      </div>
    </div>
  );
}