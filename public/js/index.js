let socket = io();
socket.on("connect", function() {
   console.log("Connected to server!");

    socket.emit("create_message", {
        from: "skoval@gmail.com",
        text: "Hey, I'm here",
        created_at: "1546789377"
    });

});

socket.on("new_message", function (message) {
    console.log("New message: ", message)
});

socket.on("disconnect", function() {
   console.log("Disconnected from server!")
});