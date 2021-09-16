import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import { io } from 'socket.io-client';




function App() {
  const ENDPOINT = 'http://127.0.0.1:5000';
  
  const [response, setResponse] = useState("");
  // let socket

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket);
    console.log(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });

  }, []);

  

  // console.log(socket)
  return (
    <div className="App">
      <header className="App-header">
        <p>{response}</p>
      </header>
    </div>
  );
}

export default App;
