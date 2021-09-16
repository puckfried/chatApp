import express from 'express';
import cors from 'cors'
import {Server} from 'socket.io'
// import http from 'http'
import { createServer } from "http";


// const app = express();
const app = express()
const PORT = 4000
const httpServer = createServer(app)
const io = new Server(httpServer,{cors: {origin: '*'}})
 

io.on('connection', (socket) => {
    console.log('Connection established');
   
  getApiAndEmit(socket);
    socket.on('disconnect', () => {
      console.log('Disconnected');
    });
  });
  
  
  const getApiAndEmit = (socket) => {
    const response = 'response you need';
    socket.emit('FromAPI', response);
  };
  
  app.set('port', process.env.PORT || 5000);

  httpServer.listen(app.get('port'), function () {
    var port = httpServer.address().port;
    console.log('Running on : ', port);
  });


// 03023590690 - info@kulturleben-berlin.de - Einkommensnachweis