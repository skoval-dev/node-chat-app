const path = require("path");
const http = require("http");
const public_path = path.join(__dirname, "..", "/public");
const express = require("express");
const port = process.env.PORT || 3000;
const socket_io = require("socket.io");

let app = express();
let server = http.createServer(app);
let io = socket_io(server);

app.use(express.static(public_path));


io.on('connection', (socket) => {
   console.log("New user connected");

    socket.emit("new_message", {
        from: "skoval@gmail.com",
        text: "What is going on.",
        created_at: "15467777990"
    });

    socket.on("create_message", function(message) {
        console.log("Create message: ", message);
    });

   socket.on("disconnect", () => {
      console.log("User was disconnected!");
   });
});




server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});