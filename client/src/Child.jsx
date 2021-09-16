import React, {useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from './socket.js';

function Child(props) {
    
    const {user} = props
    const socket = useContext(SocketContext);
    const [joined, setJoined] = useState(false);
    const [input, setInput] =useState('')
    const [msgHistory, setMsgHistory] = useState([])

    const handleInput = (data) => {
        setInput(data)
    }

    const sendMsg = useCallback(() => {
      const string = `${user}: ${input}`
      console.log(string)
      const tmpArray = [...msgHistory, string]  
      setMsgHistory(() => tmpArray)
      socket.emit('msg', tmpArray);
        setInput('')
    },[input])

    const handleInviteAccepted = useCallback(() => {
        console.log('Chat to true')
        setJoined(() => true);
 
      }, []);
  
    const handleNewMsg = useCallback((data) => {
        console.log('Message comes back -->', data)
        const tmpArray = [...data]
        console.log('This is the new Array: ', tmpArray)
        setMsgHistory(() => tmpArray)
    }, [])

      const handleJoinChat = useCallback(() => {
        console.log('clickhandler')
        socket.emit('counter', "SEND_JOIN_REQUEST");
      }, []);
    
      useEffect(() => {
        // as soon as the component is mounted, do the following tasks:
    
        // emit USER_ONLINE event
        // socket.emit("USER_ONLINE", userId); 
    
        // subscribe to socket events
        socket.on('counter', handleInviteAccepted); 
        socket.on('msg', handleNewMsg)
    
        return () => {
          // before the component is destroyed
          // unbind all event handlers used in this component
          socket.off("JOIN_REQUEST_ACCEPTED", handleInviteAccepted);
          socket.off('msg',  handleNewMsg)
        };
      }, [socket, handleInviteAccepted]);
   
      // console.log(msgHistory)
      return (
        <>
        <div>
      { !joined ? (
       <>
        <p>Welcome {user} - click the button to send a request to join chat!</p>
        <button onClick={handleJoinChat}>
            Join Chat
        </button>
      </>
      ) : (
       <>   
        <p>Congratulations {user}! You are accepted to join chat!</p>
        <label>
           Message:
            <input value={input} type='text' onChange={(e) =>handleInput(e.target.value) } />
        </label>
        <button onClick={sendMsg}>Send Message</button>
        </>
      ) }
     
    {msgHistory ? msgHistory.map((element) => {
        return(
        <h3>{element}</h3>)
    })
    : <></>
    }
    </div>
    </>
    )
}

export default Child