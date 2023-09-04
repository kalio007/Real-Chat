const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
// responding to different pings while maintaining stable connection

  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('send-chat-message', message => {
    // so "".broadcast" send the message to the other users on the server
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})