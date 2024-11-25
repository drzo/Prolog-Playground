import { create } from 'zustand';
import { EchoStateNetwork } from './esn';
import { NeuralSymbolicInterface } from './neuralSymbolic';
import * as tf from '@tensorflow/tfjs';

interface CognitiveState {
  esn: EchoStateNetwork | null;
  neuralSymbolic: NeuralSymbolicInterface | null;
  queryHistory: string[];
  patterns: Map<string, number[]>;
  initialized: boolean;
}

export const useCognitiveStore = create<CognitiveState>(() => ({
  esn: null,
  neuralSymbolic: null,
  queryHistory: [],
  patterns: new Map(),
  initialized: false
}));

export const initializeCognitiveEngine = async () => {
  const store = useCognitiveStore.getState();
  if (store.initialized) return;

  await tf.ready();
  const esn = new EchoStateNetwork(64);
  const neuralSymbolic = new NeuralSymbolicInterface();
  
  useCognitiveStore.setState({
    esn,
    neuralSymbolic,
    initialized: true
  });
};

export const optimizeQuery = async (query: string): Promise<string> => {
  const store = useCognitiveStore.getState();
  
  if (!store.initialized) {
    await initializeCognitiveEngine();
  }

  try {
    const optimizedQuery = await store.neuralSymbolic!.processQuery(query);
    useCognitiveStore.setState(state => ({
      queryHistory: [...state.queryHistory, optimizedQuery]
    }));
    
    return optimizedQuery;
  } catch (error) {
    console.error('Query optimization failed:', error);
    return query;
  }
};