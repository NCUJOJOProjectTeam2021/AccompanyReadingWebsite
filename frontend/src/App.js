import React from 'react';
import Pages from './Pages';
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
