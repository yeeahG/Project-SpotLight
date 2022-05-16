import http from "http";
import WebSocket from "ws";
import express from "express";
import { parse } from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Put all your backend code here.
//Vanilla JS Version
// function handleConnection(socket) {
//     console.log(socket)
// }


//fake Database 만듦
const sockets = []; //누군가 server에 연결되면 그 connection을 여기에 넣을 것

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
});

// server.listen(process.env.PORT, handleListen);
server.listen(3000, handleListen);

