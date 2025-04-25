const express=require('express')
const routes=require('./router/router')
const env=require('dotenv')
env.config()
const cors=require('cors')
const connectToDb=require('./db/connect')
connectToDb()
const http=require('http')
const{Server}=require('socket.io')
const app=express()
const server=http.createServer(app)
app.get('/',(req,res)=>{
    res.send('hello')
})
let onlineUsers=[];
const io= new Server(server, { cors: {
  origin:'*', // Allow React frontend
  methods: ["GET", "POST"],
  credentials:true
}})
app.use(cors())
app.use(express.json())

app.use('/user/api',routes)

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('register',(data)=>{
    if(onlineUsers.find((user)=>user.name===data.username)){
      null
    }else{ onlineUsers.push({socketId:socket.id,name:data.username})
      io.emit('onlineusers',onlineUsers)
    }
  })

  // Send a test message
 

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    onlineUsers=onlineUsers.filter((user)=>user.socketId!==socket.id)
  });

 


  socket.on('privatemessage',({reciever,sender,text})=>{
    console.log(reciever,sender,text)
    console.log('texteeef',text)
    const data={sender,text}
    io.to(reciever).emit("privatemessage",data)
  })
}
)
server.listen(process.env.PORT,()=>{
    console.log('server is running')
})