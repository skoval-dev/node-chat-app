let socket = io();
socket.on("connect", function() {
   console.log("Connected to server!");
});

socket.on("new_message", function (message) {
    console.log("New message: ", message);
    let li = $('<li></li>');
        li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on("disconnect", function() {
   console.log("Disconnected from server!")
});

$(document).on("submit", "#message-form", function(e) {
    "use strict"
    e.preventDefault();

    socket.emit("create_message", {
        from: "User",
        text: $("[name=message]").val()
    }, function() {

    });
});