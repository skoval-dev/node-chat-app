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

socket.on("new_location_message", function (message) {
    let li = $('<li></li>');
    let link = $("<a target=\"_blank\">My current position</a>");
    li.text(`${message.from}: `);
    link.attr("href", message.url);
    li.append(link);
    $('#messages').append(li);
});

socket.on("disconnect", function() {
   console.log("Disconnected from server!")
});

$(document).on("submit", "#message-form", function(e) {
    "use strict"
    e.preventDefault();
    let message = $("[name=message]").val();
    $("[name=message]").val('');
    socket.emit("create_message", {
        from: "User",
        text: message
    }, function() {

    });
});

let send_location = $("#send-location");

send_location.on('click', function () {
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser !");
    }

    navigator.geolocation.getCurrentPosition(function(position){
        "use strict"
        socket.emit("create_location_msg", {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        });
    }, function () {
        alert("Unable to fetch location");
    })
});