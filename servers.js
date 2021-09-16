import express from 'express';
import cors from 'cors'
import {Server} from 'socket.io'


// const app = express();
const app = express()
const PORT = 4000
const http = app.listen(PORT)

const io = new Server(http,{cors: {origin: '*'}})
 
  
const newConnection = (socket) => {
  const counterMsg = (data) => {
    socket.emit('counter', data)
    console.log('way to server')

  }
  
  const distributeMsg = (data) => {
    console.log('message arrive?', data)
    io.emit('msg', data)
  }


  console.log('new Connection', socket.id)
  socket.on('counter', counterMsg)
  // socket.off('counter', counterMsg)
  socket.on('disconnect', () => socket.removeAllListeners())
  socket.on('msg', (data) => distributeMsg(data))
}



io.on('connection', newConnection)

 app.set('port', process.env.PORT || 5000);



// 03023590690 - info@kulturleben-berlin.de - Einkommensnachweis