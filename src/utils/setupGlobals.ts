// Global setup and polyfills
const setupGlobals = () => {
  // Define required globals on window and globalThis
  const globals = {
    // Tau-prolog file system interface
    tau_file_system: {
      get_file_system: () => ({
        get: () => '',
        put: () => false,
        exists: () => false,
        directory: () => false,
        absolute: (x: string) => x
      })
    },
    // Node.js file system interface
    nodejs_file_system: {
      readFileSync: () => '',
      existsSync: () => false,
      statSync: () => ({ isDirectory: () => false }),
      realpathSync: (x: string) => x
    },
    // Tau-prolog I/O interfaces
    tau_user_input: {
      get: (_success: Function, _error: Function) => {},
      put: (_text: string, _success: Function, _error: Function) => {}
    },
    tau_user_output: {
      put: (_text: string, _success: Function, _error: Function) => {},
      flush: (_success: Function, _error: Function) => {}
    },
    tau_user_error: {
      put: (_text: string, _success: Function, _error: Function) => {},
      flush: (_success: Function, _error: Function) => {}
    },
    // Node.js compatibility
    process: { 
      env: {},
      cwd: () => '/',
      platform: 'browser'
    },
    Buffer: {
      from: (str: string) => new TextEncoder().encode(str),
      isBuffer: () => false
    },
    // Path compatibility
    path: {
      resolve: (...paths: string[]) => paths.join('/'),
      join: (...paths: string[]) => paths.join('/'),
      dirname: (path: string) => path.split('/').slice(0, -1).join('/'),
      basename: (path: string) => path.split('/').pop() || ''
    }
  };

  // Ensure globals are available everywhere
  Object.entries(globals).forEach(([key, value]) => {
    if (typeof window !== 'undefined') {
      if (!(key in window)) {
        (window as any)[key] = value;
      }
    }
    if (!(key in globalThis)) {
      (globalThis as any)[key] = value;
    }
  });
};

// Execute setup immediately
setupGlobals();

export default setupGlobals;