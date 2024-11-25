import * as tf from '@tensorflow/tfjs';
import { EchoStateNetwork } from './esn';
import { getPrologInstance } from './prologInit';

interface SymbolicPattern {
  predicate: string;
  arguments: string[];
  confidence: number;
}

export class NeuralSymbolicInterface {
  private esn: EchoStateNetwork;
  private patternMemory: Map<string, tf.Tensor1D>;
  private symbolMapping: Map<string, number>;
  
  constructor() {
    this.esn = new EchoStateNetwork(128); // Increased size for symbolic representation
    this.patternMemory = new Map();
    this.symbolMapping = new Map();
  }

  public async processQuery(query: string): Promise<string> {
    const symbolic = this.parseToSymbolic(query);
    const encoded = this.encodeSymbolic(symbolic);
    const prediction = await this.predictPattern(encoded);
    return this.optimizeQuery(query, prediction, symbolic);
  }

  private parseToSymbolic(query: string): SymbolicPattern {
    const pl = getPrologInstance();
    const terms = query.replace(/\.$/, '').split('(');
    
    return {
      predicate: terms[0],
      arguments: terms[1]?.replace(')', '').split(',').map(arg => arg.trim()) || [],
      confidence: 1.0
    };
  }

  private encodeSymbolic(pattern: SymbolicPattern): tf.Tensor2D {
    const encoded = new Array(128).fill(0);
    
    // Encode predicate
    const predicateHash = this.hashString(pattern.predicate);
    encoded[0] = predicateHash;
    
    // Encode arguments
    pattern.arguments.forEach((arg, i) => {
      const argHash = this.hashString(arg);
      encoded[i + 1] = argHash;
    });
    
    return tf.tensor2d([encoded]);
  }

  private async predictPattern(encoded: tf.Tensor2D): Promise<tf.Tensor2D> {
    return this.esn.step(encoded);
  }

  private async optimizeQuery(
    originalQuery: string,
    prediction: tf.Tensor2D,
    symbolic: SymbolicPattern
  ): Promise<string> {
    const predictedPattern = await this.findClosestPattern(prediction);
    
    if (predictedPattern && predictedPattern.confidence > 0.8) {
      return this.reconstructQuery(predictedPattern);
    }
    
    return originalQuery;
  }

  private async findClosestPattern(
    prediction: tf.Tensor2D
  ): Promise<SymbolicPattern | null> {
    let bestMatch: SymbolicPattern | null = null;
    let bestSimilarity = -1;

    for (const [key, pattern] of this.patternMemory.entries()) {
      const similarity = await this.computeSimilarity(prediction, pattern);
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestMatch = JSON.parse(key);
      }
    }

    return bestMatch;
  }

  private async computeSimilarity(
    a: tf.Tensor2D,
    b: tf.Tensor1D
  ): Promise<number> {
    const normalized = tf.div(a, tf.norm(a));
    const dotProduct = tf.sum(tf.mul(normalized.squeeze(), b));
    return (await dotProduct.data())[0];
  }

  private reconstructQuery(pattern: SymbolicPattern): string {
    return `${pattern.predicate}(${pattern.arguments.join(', ')}).`;
  }

  private hashString(str: string): number {
    if (!this.symbolMapping.has(str)) {
      this.symbolMapping.set(str, this.symbolMapping.size / 100);
    }
    return this.symbolMapping.get(str)!;
  }

  public dispose(): void {
    this.esn.dispose();
    this.patternMemory.forEach(tensor => tensor.dispose());
  }
}