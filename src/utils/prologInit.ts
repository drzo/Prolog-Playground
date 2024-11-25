// Import globals setup first
import '../utils/setupGlobals';

// Now we can safely import tau-prolog
import pl from 'tau-prolog';

// Initialize the Prolog engine
let prologInstance: any = null;

try {
  prologInstance = pl;
  console.log('Tau-prolog initialized successfully');
} catch (error) {
  console.error('Failed to initialize tau-prolog:', error);
}

export const getPrologInstance = () => prologInstance;

export const isPrologReady = () => {
  return new Promise((resolve, reject) => {
    if (prologInstance) {
      resolve(prologInstance);
    } else {
      reject(new Error('Prolog instance not initialized'));
    }
  });
};