var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var numbers = 1;        //Variable that keeps track of what room to join 
var playerX = true;

io.on("connection", socket => {
    const roomName = "room " + Math.floor(numbers); 
    socket.join(roomName, function() {
        const type = playerX ? "X" : "O";
        socket.emit("sendPlayer", {type}); //Emit to player what type thet are
        if(!playerX) {
            io.to(roomName).emit("isReady"); //If two players are in room then emit that game is ready
        }
        playerX = !playerX;

        let rooms = Object.keys(socket.rooms);
        numbers += 0.5;
        console.log(rooms);
    });

    socket.on("playerWent", function(data) {    //Handle when server recieves that a player has went
        socket.to(Object.keys(socket.rooms)[1]).emit("updateBoard", data);
    });

    socket.on("gameOver", function(data) {      //Handle the game is over emit from client
        io.to(Object.keys(socket.rooms)[1]).emit("endGame", data);
    });

});



http.listen(4000, function() {
    console.log("running server on 4000");
});
