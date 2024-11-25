import { getPrologInstance } from './prologInit';

self.onmessage = async (e) => {
  const { program, query } = e.data;
  const pl = getPrologInstance();
  
  if (!pl) {
    self.postMessage({ type: 'error', data: 'Prolog instance not initialized' });
    return;
  }

  const session = pl.create();

  session.consult(program, {
    success: () => {
      session.query(query, {
        success: () => {
          function getAnswers() {
            session.answer({
              success: (answer: any) => {
                self.postMessage({
                  type: 'solution',
                  data: session.format_answer(answer)
                });
                getAnswers();
              },
              fail: () => {
                self.postMessage({ type: 'complete' });
              },
              error: (err: any) => {
                self.postMessage({
                  type: 'error',
                  data: `Runtime error: ${err}`
                });
              },
              limit: () => {
                self.postMessage({
                  type: 'error',
                  data: 'Query limit exceeded'
                });
              }
            });
          }
          getAnswers();
        },
        error: (err: any) => {
          self.postMessage({
            type: 'error',
            data: `Query error: ${err}`
          });
        }
      });
    },
    error: (err: any) => {
      self.postMessage({
        type: 'error',
        data: `Program error: ${err}`
      });
    }
  });
};