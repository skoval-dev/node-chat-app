let socket = io();
socket.on("connect", function() {
   console.log("Connected to server!");
});

socket.on("new_message", function (message) {
    console.log("New message: ", message)
});

socket.on("disconnect", function() {
   console.log("Disconnected from server!")
});