const path = require("path");
const http = require("http");
const public_path = path.join(__dirname, "..", "/public");
const express = require("express");
const port = process.env.PORT || 3000;
const socket_io = require("socket.io");

const {generate_message, generate_location_message} = require("./utils/message");
let app = express();
let server = http.createServer(app);
let io = socket_io(server);

app.use(express.static(public_path));


io.on('connection', (socket) => {
   console.log("New user connected");

    socket.emit("new_message", generate_message("Admin", "Welcome to the"
                                                         + " chat App"));
    socket.broadcast.emit("new_message", generate_message("Admin", "New user"
                                                                   + " joined"));
    socket.on("create_message", function(message, callback) {
        console.log("Create message: ", message);
        io.emit("new_message", generate_message(message.from, message.text));
        callback(message);
    });

    socket.on("create_location_msg", (coords) => {
        io.emit("new_location_message", generate_location_message("Admin", coords.latitude, coords.longitude))
    });

   socket.on("disconnect", () => {
      console.log("User was disconnected!");
   });
});




server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});