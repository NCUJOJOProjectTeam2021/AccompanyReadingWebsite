import React, { Children, createContext, useContext, useState } from 'react';

const initialState = {
    nickName: '',
    selectedRoom: null,
    rooms: [],
    createRoomTopic: '',
    twilloToken: '',
    device: null
};
const RoomContext = createContext(null);

export const RoomContextProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    return (
        <RoomContext.Provider value={[state, setState]}>
            {children}
        </RoomContext.Provider>
    )
}

export const useGlobalState = () => {
    const value = useContext(RoomContext);
    if (value === undefined) throw new Error('Please add Roo,ContextProvider');
    return value;
}