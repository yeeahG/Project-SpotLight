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

wss.on("connection", (socket) => {
    console.log("Connected to Browser🌳");
    socket.send("Hello!") //front에 메세지 전송
});

// server.listen(process.env.PORT, handleListen);
server.listen(3000, handleListen);
