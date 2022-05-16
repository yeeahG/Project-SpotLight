// Put all your frontend code here.
// function fn(event) {}

// form.addEventListner("submit", fn)

//frontend -> Backend 연결하는 방법
// const socket = new WebSocket("http://localhost:3000"); The URL's scheme must be either 'ws' or 'wss'. 'http' is not allowed.
const socket = new WebSocket(`ws://${window.location.host}`);