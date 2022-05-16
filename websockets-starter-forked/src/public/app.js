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
    // console.log("New message: ", message.data, "from the server")

    //새로운 메세지를 받으면 li를 생성
    const li = document.createElement("li");
    //message data를 li안에 넣어줌
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected to Server ❌")
});

//Backend로 message 보내기
//즉시 실행되길 원하지 않기 때문에
// setTimeout(() => {
//     socket.send("Hello from the browser!");
// }, 10000)


const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");


function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value); //front의 form에서 back으로 무언가를 보내고 있음
    // console.log(input.value);
    input.value=""; //input을 비워줌
}
messageForm.addEventListener("submit", handleSubmit);