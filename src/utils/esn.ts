import * as tf from '@tensorflow/tfjs';

export class EchoStateNetwork {
  private reservoirSize: number;
  private inputSize: number;
  private reservoirState: tf.Tensor2D;
  private weights: {
    input: tf.Tensor2D;
    reservoir: tf.Tensor2D;
    output: tf.Tensor2D;
  };
  private spectralRadius: number;
  private leakingRate: number;

  constructor(inputSize: number, reservoirSize: number = 100) {
    this.inputSize = inputSize;
    this.reservoirSize = reservoirSize;
    this.spectralRadius = 0.95;
    this.leakingRate = 0.3;
    
    this.initializeWeights();
    this.reservoirState = tf.zeros([1, this.reservoirSize]);
  }

  private initializeWeights() {
    // Initialize input weights
    this.weights = {
      input: tf.randomNormal([this.inputSize, this.reservoirSize], 0, 0.1),
      reservoir: this.createReservoirWeights(),
      output: tf.zeros([this.reservoirSize, this.inputSize])
    };
  }

  private createReservoirWeights(): tf.Tensor2D {
    const weights = tf.randomNormal([this.reservoirSize, this.reservoirSize], 0, 1);
    const eigenvalues = tf.spectral.eig(weights);
    const maxEigenvalue = tf.max(tf.abs(eigenvalues.realEigenvalues));
    return tf.mul(weights, this.spectralRadius / maxEigenvalue);
  }

  public step(input: tf.Tensor2D): tf.Tensor2D {
    const inputProjection = tf.matMul(input, this.weights.input);
    const reservoirProjection = tf.matMul(this.reservoirState, this.weights.reservoir);
    
    // Update reservoir state with leaking rate
    const newState = tf.tanh(tf.add(inputProjection, reservoirProjection));
    this.reservoirState = tf.add(
      tf.mul(tf.scalar(1 - this.leakingRate), this.reservoirState),
      tf.mul(tf.scalar(this.leakingRate), newState)
    );
    
    return tf.matMul(this.reservoirState, this.weights.output);
  }

  public train(inputs: tf.Tensor2D[], targets: tf.Tensor2D[]): void {
    const states: tf.Tensor2D[] = [];
    
    // Collect reservoir states
    inputs.forEach(input => {
      const state = this.step(input);
      states.push(state);
    });
    
    // Ridge regression for output weights
    const combinedStates = tf.concat(states);
    const combinedTargets = tf.concat(targets);
    const ridge = 1e-6;
    
    const statesT = tf.transpose(combinedStates);
    const term1 = tf.matMul(statesT, combinedStates);
    const regularization = tf.mul(tf.eye(this.reservoirSize), ridge);
    const term2 = tf.matMul(statesT, combinedTargets);
    
    this.weights.output = tf.matMul(
      tf.tensor2d(tf.linalg.inv(tf.add(term1, regularization)).arraySync()),
      term2
    );
  }

  public dispose(): void {
    this.reservoirState.dispose();
    Object.values(this.weights).forEach(w => w.dispose());
  }
}