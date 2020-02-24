var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var numbers = 1;
var playerX = true;

io.on("connection", socket => {
    console.log("connected to socket");
    const roomName = "room " + Math.floor(numbers);
    socket.join(roomName, function() {
        const type = playerX ? "X" : "O";
        socket.emit("sendPlayer", {type});
        if(!playerX) {
            io.to(roomName).emit("isReady");
        }
        playerX = !playerX;

        let rooms = Object.keys(socket.rooms);
        numbers += 0.5;
        console.log(rooms);
    });

    socket.on("playerWent", function(data) {
        socket.to(Object.keys(socket.rooms)[1]).emit("updateBoard", data);
    });

    socket.on("gameOver", function(data) {
        io.to(Object.keys(socket.rooms)[1]).emit("endGame", data);
    });

});



http.listen(4000, function() {
    console.log("running server on 3000");
});
