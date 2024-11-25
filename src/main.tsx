// Initialize globals first
import './utils/setupGlobals';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';
import './styles/prism-theme.css';

// Initialize cognitive engine
import { initializeCognitiveEngine } from './utils/cognitiveEngine';

// Wait for everything to be ready before rendering
const init = async () => {
  await initializeCognitiveEngine();
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
};

init().catch(console.error);