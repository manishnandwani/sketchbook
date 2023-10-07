import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection',(socket) =>{
        socket.on('beginPath',(arg)=>{                                       // step 2 get beginPath with x,y
            socket.broadcast.emit('beginPath',arg);       // step 3 broadcase emit beginPath with x,y
        })

        socket.on('drawLine',(arg)=>{
            socket.broadcast.emit('drawLine',arg);
        })

        socket.on('changeTool',(arg)=>{
            socket.broadcast.emit('changeTool',arg);
        })
    })
    
  }
  res.end()
}

export default SocketHandler