import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import { io } from 'socket.io-client';
import { SocketContext, socket } from './socket';
import Child from './Child';


function App(){
const [input, setInput] = useState('')
const [user, setUser] = useState('')

  return (
    <SocketContext.Provider value={socket}>
      {!user ? 
      <>   
        <h3>Welcome to this faboulus chat app</h3>
        <label>
           Choose a username:
            <input value={input} type='text' onChange={(e) =>setInput(e.target.value) } />
        </label>
        <button onClick={() => setUser(input)}>Start chatting</button>
        </>
        : <Child user={user}/>
        }
      

   </SocketContext.Provider>
  );

}
 export default App;

// function App() {
//   const ENDPOINT = 'http://127.0.0.1:4000';
//   const socket = socketIOClient(ENDPOINT);

//   const [response, setResponse] = useState("");
//   let   [click, setClick]       = useState(0)


//   useEffect(() => {
//     socket.on('FromAPI', (data) => {
//       setResponse(data);
//     });
//     socket.on('counter',handleIncoming)
//   }, []);


//   const handleIncoming = (data) => {
//     console.log('What comes here???', data)

//   }

  
// const handleClick = async () => {
//     console.log('clicked')
//     socket.emit('counter', 'Click')
// }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>{response}</p>
//         <button style={{border: 'none', padding:'20px', fontWeight: 'bold', borderRadius: '30px'}}onClick={handleClick}>Count up</button>
//         <h3>You clicked: {click}</h3>
//       </header>
//     </div>
//   );
// }

// export default App;
