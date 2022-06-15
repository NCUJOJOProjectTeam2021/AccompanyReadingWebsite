import React, { Children, createContext, useContext, useState } from 'react';

const initialState = {
    username: '',
    selectedRoom: null,
    rooms: [],
    createRoomTopic: '',
    twilioToken: '',
    device: null
};
const Context = createContext(null);

export const ContextProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
}

export const useGlobalState = () => {
    const value = useContext(Context);
    if (value === undefined) throw new Error('Please add Roo,ContextProvider');
    return value;
}