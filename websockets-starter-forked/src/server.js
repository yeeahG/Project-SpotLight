import http from "http";

import WebSocket from "ws";
import SocketIO from "socket.io";

import express from "express";
import { parse } from "path";

const app = express();


// Put all your backend code here.
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);

//const wss = new WebSocket.Server({ httpServer });
//wss대신 socketio로
const wsServer = SocketIO(httpServer);
/* 여기까지가 socket IO 설치하는 법*/

wsServer.on("connection", (socket) => {
    socket["nickname"] = "Anon"
    socket.onAny((event) => {
        console.log(`Socket event : ${event}`);

        //2.8 adapter
        console.log(wsServer.sockets.adapter);
    });


    socket.on("enter_room", (roomName, done) => {
        console.log(socket.rooms); //socket id가 출력됨
        socket.join(roomName)
        done();
        socket.to(roomName).emit("Welcome", socket.nickname)

        //누군가가 방에 입장할 때 메세지를 보냄
        //publicRooms는 현재 우리서버의 모든 방의 array를 줌
        wsServer.sockets.emit("room_change", publicRooms());
    });


    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("Bye", socket.nickname));
    })

    socket.on("disconnect", () => {
        //누군가가 방을 떠날 때
        wsServer.sockets.emit("room_change", publicRooms());
    });


    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`)
        done();
    });

    socket.on("nickname", nickname => (socket["nickname"] = nickname))
})

//public room을 주는 Function
function publicRooms() {
    // const sids = wsServer.sockets.adapter.sids;
    // const rooms = wsServer.socket.adapter.rooms;

    //위에 두줄을
    const {
        sockets: {
            adapter: {sids, rooms},
        }
    } = wsServer;
    
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if(sids.get(key) === undefined) {
            publicRooms.push(key)
        }
    })
    return publicRooms;
}

//Vanilla JS Version
// function handleConnection(socket) {
//     console.log(socket)
// }


//fake Database 만듦
/* const sockets = []; //누군가 server에 연결되면 그 connection을 여기에 넣을 것

wss.on("connection", (socket) => { //Browser가 연결되면
    sockets.push(socket);
    //nickname을 정하지 않은 사람들에게
    socket["nickname"] = "Person";

    console.log("Connected to Browser🌳"); 
    socket.on("close", () => console.log("Disconnected from the Browser❌")); //브라우저가 꺼졌을 때를 위한 listener
    socket.on("message", (msg) => { //browser가 server에 메세지를 보냈을 때를 위한 listener
        // console.log(message);

        //user가 보낸 메세지를 다시 user에게 보내줄 것
        // socket.send(message);
        const message = JSON.parse(msg);
        // console.log(message, message);
        switch (message.type) {
            case "new_message":
                // sockets.forEach(aSocket => aSocket.send(message.payload));
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`));
            case "nickname":
                //socket에 새로운 item 추가
                // console.log(message.payload);
                socket["nickname"] = message.payload;
        }

    });
    // socket.send("Hello!"); //front 브라우저에 메세지 전송
}); */

// server.listen(process.env.PORT, handleListen);
httpServer.listen(3000, handleListen);

//http://localhost:3000/socket.io/socket.io.js을 받음