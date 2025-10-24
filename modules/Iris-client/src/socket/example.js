"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client");
var socket = new client_1.Socket({
    host: "192.168.0.1",
    port: 4655,
    path: "/websocket"
});
socket.setMessage(function (webSocket, text) {
    console.log("Received message: " + text);
});
socket.connect();
