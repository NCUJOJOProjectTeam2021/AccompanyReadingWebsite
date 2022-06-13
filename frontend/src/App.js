import React from 'react';
import Pages from './routes';
import { ContextProvider } from './global/api/ContextProvider';
import Routers from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <ContextProvider>
      <Routers />
      {/* <Router>
        <Routers />
      </Router> */}
    </ContextProvider>
  );
};

export default App;
