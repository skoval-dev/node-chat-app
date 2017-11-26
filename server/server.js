const path = require("path");
const http = require("http");
const public_path = path.join(__dirname, "..", "/public");
const express = require("express");
const port = process.env.PORT || 3000;
const socket_io = require("socket.io");

const {generate_message} = require("./utils/message");
let app = express();
let server = http.createServer(app);
let io = socket_io(server);

app.use(express.static(public_path));


io.on('connection', (socket) => {
   console.log("New user connected");

    socket.on("create_message", function(message) {
        console.log("Create message: ", message);
        //socket.broadcast.emit("new_message", {
        //    "from": message.from,
        //    text: message.text,
        //    created_at: new Date().getTime()
        //})
        socket.emit("new_message", generate_message("Admin", "Welcome to the"
                                                             + " chat App"));

        socket.broadcast.emit("new_message", generate_message("Admin", "New"
                                                         + " user joined"));
    });

   socket.on("disconnect", () => {
      console.log("User was disconnected!");
   });
});




server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});