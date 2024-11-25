import React, { useState, useEffect } from 'react';
import { PrologEditor } from './components/PrologEditor';
import { QueryInput } from './components/QueryInput';
import { ResultDisplay } from './components/ResultDisplay';
import { runPrologQuery, QueryResult } from './utils/prologEngine';
import { isPrologReady } from './utils/prologInit';

const DEFAULT_PROGRAM = `% Family relationships example
parent(john, mary).
parent(john, bob).
parent(mary, ann).
parent(mary, pat).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).`;

function App() {
  const [program, setProgram] = useState<string>(DEFAULT_PROGRAM);
  const [query, setQuery] = useState<string>('grandparent(john, X).');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    isPrologReady()
      .then(() => setIsReady(true))
      .catch((err) => {
        console.error('Failed to initialize Prolog:', err);
        setError('Failed to initialize Prolog engine. Please try refreshing the page.');
      });
  }, []);

  const handleRunQuery = async () => {
    if (!isReady) return;
    try {
      const queryResult = await runPrologQuery(program, query);
      setResult(queryResult);
    } catch (err) {
      setResult({ solutions: [], error: 'Failed to execute query' });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600">Initializing Prolog engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Prolog Playground</h1>
        <PrologEditor program={program} onProgramChange={setProgram} />
        <QueryInput 
          query={query} 
          onQueryChange={setQuery} 
          onRunQuery={handleRunQuery} 
        />
        <ResultDisplay result={result} />
      </div>
    </div>
  );
}

export default App;