// Put all your frontend code here.
// function fn(event) {}

// form.addEventListner("submit", fn)

//frontend -> Backend 연결하는 방법
// const socket = new WebSocket("http://localhost:3000"); The URL's scheme must be either 'ws' or 'wss'. 'http' is not allowed.
const socket = new WebSocket(`ws://${window.location.host}`);

//recieved message from backend
socket.addEventListener("open", () => {
    console.log("Connected to Server🌳");
})

//message를 받았을 때 사용하는 listener
socket.addEventListener("message", (message) => {
    console.log("Just got this: ", message.data, "from the server")
});

socket.addEventListener("close", () => {
    console.log("Disconnected to Server ❌")
});

//Backend로 message 보내기
//즉시 실행되길 원하지 않기 때문에
setTimeout(() => {
    socket.send("Hello from the browser!");
}, 10000)