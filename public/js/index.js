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
    let button = $("button[type=submit]");
    let message = $("[name=message]");
    if(message.val().length === 0) return false;
    button.attr("disabled", "disabled").text("Sending...");
    socket.emit("create_message", {
        from: "User",
        text: message.val()
    }, function() {
        button.removeAttr("disabled").text("Send");
        message.val('');
    });
});

let send_location = $("#send-location");

send_location.on('click', function () {
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser !");
    }

    send_location.attr("disabled", "disabled").text("Sending location");

    navigator.geolocation.getCurrentPosition(function(position){
        "use strict"
        send_location.removeAttr("disabled").text("Send location");
        socket.emit("create_location_msg", {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        });
    }, function () {
        send_location.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location");
    })
});