import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import Chat from './chat';
import InputControls from './InputControls';
import { selectTokensUsed } from './state/tokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setChatMessages } from './state/chatSlice';
import { Socket } from 'socket.io-client';

const App: React.FC = () => {
    const dispatch = useDispatch()
    const tokensUsed = useSelector(selectTokensUsed)

    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const newSocket = io('http://localhost:1234');
        setSocket(newSocket); // Set the socket to state
        newSocket.on('welcome', (data) => {
            console.log("WELCOME MESSAGE")
            console.log(data.messages)
            dispatch(setChatMessages(data.messages)) // adds the gpt initial context to the client messages
        });

    // Cleanup the socket connection when the component is unmounted
    return () => {
        newSocket.close();
    };
    },[dispatch]);
  return (
    <div className="App">
      <div className="token-counter">
        Tokens Used: {tokensUsed}
      </div>
      <Chat></Chat>
      <InputControls socket={socket}></InputControls>
    </div>
  );
};

export default App;
