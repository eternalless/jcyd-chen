var express = require('express');
var app = express();
var path = require('path');
var server =require('http').Server(app)
var io=require('socket.io').listen(server)

app.use(express.static('public'));

app.use('/',function (req,res,next) {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.sendFile('views/index.html',{root:__dirname});
})

io.sockets.on('connection',function(socket){
    console.log('User connected');
    socket.emit('open');
    socket.on('message',function(msg){
        console.log('服务器接受到客户端消息',msg);
        // socket.emit('test','server ready');
        socket.broadcast.emit('test','server ready');
    });

    socket.on('disconnect',function () {
    })
});

server.listen(3001, function () {
    console.log('server listening on port 3000');
});