"use strict";

let w = false;
let a = false;
let s = false;
let d = false;

let WebSocketServer = null;
let ws = null;

eval(" ws =  require('ws');   ");
eval("    WebSocketServer = new require('ws');   ");

let portNumber = process.env.PORT || 5005;
let  webSocketServer = new WebSocketServer.Server({
    port: portNumber
});

console.log("Port: " + portNumber);
console.log("___________________________\n");

let clients = {};
let nameCounter = 1;

webSocketServer.on("connection", function(ws) {
    let id = "id_" + nameCounter;
    nameCounter++;
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on("close", function() {
        console.log('соединение закрыто ' + id);
        try {
            delete clients[id];
        } catch (err) { }
    });


    ws.on("message", function(message) {
        console.log("получено сообщение " + message + " от " + id);
        if(message !== "__OK__OK__") {
            w = false;
            a = false;
            s = false;
            d = false;
            if (message.indexOf("W") !== -1) w = true;
            if (message.indexOf("A") !== -1) a = true;
            if (message.indexOf("S") !== -1) s = true;
            if (message.indexOf("D") !== -1) d = true;
        }
    });
});


let myInter = setInterval(function () {
    let message = "__";

    if(w === true) message += "W";
    if(a === true) message += "A";
    if(s === true) message += "S";
    if(d === true) message += "D";

    message += "___";

    for (let key in clients) {
        try {
            clients[key].send(message);
        } catch (err) { }
    }
}, 50);

