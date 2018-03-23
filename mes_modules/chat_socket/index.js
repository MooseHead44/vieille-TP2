const util = require('util')
let socketio = require('socket.io')

module.exports.listen = function(server) {
  let io = socketio.listen(server)
  let objetUtil = {}

  io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('setUser', function(data) {
      objetUtil[socket.id] = data.user
      console.log("objetUtil = " + util.inspect(objetUtil))
      console.log(util.inspect(data))
      socket.emit('valid_user', data)
      io.sockets.emit('diffuser_list_user', objetUtil)
    })

    socket.on('sendMessage', function(data) {
      socket.broadcast.emit('message', data);
      socket.emit('valide_message', data);
    })
    
    socket.on('disconnect', function(data) {
      delete objetUtil[socket.id];
      io.sockets.emit('diffuser_list_user', objetUtil);
    })
})
 return io
}