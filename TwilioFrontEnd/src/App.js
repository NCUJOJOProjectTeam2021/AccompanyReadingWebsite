import React from 'react';
import Pages from './components/Pages';
import { RoomContextProvider } from './API/RoomContextProvider';

const App = () => {
  return (
    <RoomContextProvider>
      <div>
        <Pages />
      </div>
    </RoomContextProvider>
  );
};

export default App;