import React from 'react';
import Pages from './Pages';
import { ContextProvider } from './global/api/ContextProvider';

const App = () => {
  return (
    <ContextProvider>
      <div>
        <Pages />
      </div>
    </ContextProvider>
  );
};

export default App;
