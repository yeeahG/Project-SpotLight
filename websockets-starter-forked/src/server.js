import http from "http";
import WebSocket from "ws";
import express from "express";

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

wss.on("connection", (socket) => { //Browser가 연결되면
    console.log("Connected to Browser🌳"); 
    socket.on("close", () => console.log("Disconnected from the Browser❌")); //브라우저가 꺼졌을 때를 위한 listener
    socket.on("message", message => { //browser가 server에 메세지를 보냈을 때를 위한 listener
        console.log(message);
    })
    socket.send("Hello!"); //front 브라우저에 메세지 전송
});

// server.listen(process.env.PORT, handleListen);
server.listen(3000, handleListen);
