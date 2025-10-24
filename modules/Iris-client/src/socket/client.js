"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
require("../../../types/android");
var Okhttp3 = Packages.okhttp3;
var OkHttpClient = Okhttp3.OkHttpClient, Request = Okhttp3.Request, WebSocketListener = Okhttp3.WebSocketListener;
var Socket = /** @class */ (function () {
    function Socket(config) {
        this.onOpen = function () { };
        this.onMessage = function () { };
        this.onClosing = function () { };
        this.onClosed = function () { };
        this.onFailure = function () { };
        this.config = {
            protocol: "ws",
            host: "127.0.0.1",
            port: 8080,
            path: "/"
        };
        this.websocket = null;
        if (config) {
            Object.assign(this.config, config);
        }
    }
    Socket.prototype.setOpen = function (fn) {
        this.onOpen = fn;
    };
    Socket.prototype.setMessage = function (fn) {
        this.onMessage = fn;
    };
    Socket.prototype.setClosing = function (fn) {
        this.onClosing = fn;
    };
    Socket.prototype.setClosed = function (fn) {
        this.onClosed = fn;
    };
    Socket.prototype.setFailure = function (fn) {
        this.onFailure = fn;
    };
    Socket.prototype.connect = function () {
        this.websocket = new OkHttpClient().newWebSocket(new Request.Builder()
            .url(this.config.protocol + "://" + this.config.host + ":" + this.config.port + this.config.path)
            .build(), new JavaAdapter(WebSocketListener, {
            onOpen: this.onOpen,
            onMessage: this.onMessage,
            onClosing: this.onClosing,
            onClosed: this.onClosed,
            onFailure: this.onFailure
        }));
    };
    Socket.prototype.close = function (code, reason) {
        if (code === void 0) { code = 1000; }
        if (reason === void 0) { reason = null; }
        if (this.websocket) {
            this.websocket.close(code, reason);
            this.websocket = null;
        }
    };
    Socket.prototype.send = function (message) {
        if (this.websocket) {
            this.websocket.send(message);
        }
    };
    return Socket;
}());
exports.Socket = Socket;
