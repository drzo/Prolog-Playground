import { getPrologInstance } from './prologInit';
import { optimizeQuery } from './cognitiveEngine';
import * as tf from '@tensorflow/tfjs';

export interface QueryResult {
  solutions: string[];
  error?: string;
  metrics?: {
    executionTime: number;
    optimizationTime: number;
    patternMatch?: boolean;
  };
}

export async function runPrologQuery(program: string, query: string): Promise<QueryResult> {
  const startTime = performance.now();
  
  try {
    const pl = getPrologInstance();
    if (!pl) {
      throw new Error('Prolog instance not initialized');
    }

    // Optimize query using cognitive engine
    const optimizationStart = performance.now();
    const optimizedQuery = await optimizeQuery(query);
    const optimizationTime = performance.now() - optimizationStart;
    
    return new Promise((resolve) => {
      const session = pl.create();
      const result: QueryResult = { 
        solutions: [],
        metrics: {
          executionTime: 0,
          optimizationTime,
          patternMatch: optimizedQuery !== query
        }
      };
      
      // Use Web Worker for heavy computations
      const worker = new Worker(new URL('./prologWorker.ts', import.meta.url), {
        type: 'module'
      });

      worker.onmessage = (e) => {
        const { type, data } = e.data;
        if (type === 'solution') {
          result.solutions.push(data);
        } else if (type === 'error') {
          result.error = data;
          result.metrics!.executionTime = performance.now() - startTime;
          resolve(result);
        } else if (type === 'complete') {
          result.metrics!.executionTime = performance.now() - startTime;
          resolve(result);
        }
      };

      worker.postMessage({ program, query: optimizedQuery });
    });
  } catch (error) {
    const executionTime = performance.now() - startTime;
    return {
      solutions: [],
      error: `Failed to initialize Prolog: ${error}`,
      metrics: {
        executionTime,
        optimizationTime: 0
      }
    };
  }
}