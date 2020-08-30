const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', function(socket){    
    socket.on('xpto', function(msg){
        console.log(`msg_original: ${msg}`);
        var _msg = JSON.parse(msg);
        console.log(`msg: ${_msg}`);
        console.log(`channel: ${_msg.output}`);
        io.emit(_msg.output, msg);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

});
server.listen(port, () => console.log(`Listening on port ${port}`));