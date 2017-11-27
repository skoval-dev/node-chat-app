const path = require("path");
const http = require("http");
const public_path = path.join(__dirname, "..", "/public");
const express = require("express");
const port = process.env.PORT || 3000;
const socket_io = require("socket.io");

const {generate_message, generate_location_message} = require("./utils/message");
const {is_real_string} = require("./utils/validation");
const {Users} = require("./utils/users");

let app = express();
let server = http.createServer(app);
let io = socket_io(server);
let users = new Users();

app.use(express.static(public_path));


io.on('connection', (socket) => {
   console.log("New user connected");

    socket.on("join", (params, callback) => {
        "use strict"
        if(!is_real_string(params.name) || !is_real_string(params.room)){
           return callback("Name and room name are required!");
        }

        socket.join(params.room);

        users.remove_user(socket.id);
        users.add_user(socket.id, params.name, params.room);

        io.to(params.room).emit("update_user_list", users.get_user_list(params.room));

        socket.emit("new_message", generate_message("Admin", "Welcome to the"
                                                             + " chat App"));
        socket.broadcast.to(params.room).emit("new_message", generate_message("Admin", `${params.name} has joined`));

        callback();
    });

    socket.on("create_message", function(message, callback) {
        console.log("Create message: ", message);
        io.emit("new_message", generate_message(message.from, message.text));
        callback(message);
    });

    socket.on("create_location_msg", (coords) => {
        io.emit("new_location_message", generate_location_message("Admin", coords.latitude, coords.longitude))
    });

   socket.on("disconnect", () => {
        let user = users.remove_user(socket.id);

        if(user){
            io.to(user.room).emit("update_user_list", users.get_user_list(user.room));
            io.to(user.room).emit("new_message", generate_message("Admin: ", `${user.name} has left`));
        }
   });
});




server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});