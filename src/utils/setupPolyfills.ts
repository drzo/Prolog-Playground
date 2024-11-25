// Polyfills and global setup for tau-prolog
export const setupPolyfills = () => {
  // Define required globals before any imports
  globalThis.tau_file_system = {
    get_file_system: () => ({
      get: () => '',
      put: () => false,
      exists: () => false,
      directory: () => false,
      absolute: (x: string) => x
    })
  };

  globalThis.tau_user_input = {
    get: (_success: Function, _error: Function) => {},
    put: (_text: string, _success: Function, _error: Function) => {}
  };

  // Ensure process is available
  if (typeof process === 'undefined') {
    (window as any).process = { env: {} };
  }

  // Buffer polyfill
  if (typeof Buffer === 'undefined') {
    (window as any).Buffer = {
      from: (str: string) => new TextEncoder().encode(str),
      isBuffer: () => false
    };
  }
};