const socket = new WebSocket("ws://localhost:3001"); //WebSocket is a browser api, ws is the protocol

const form = document.querySelector("form");

form.addEventListener("submit", sendMessage);

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input");
  if (input.value) {
    socket.send(input.value);
    input.value=""
  }
}

socket.addEventListener("message", (e) => {
  //or {data}
  //   console.log(e.data);
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = e.data;
  ul.appendChild(li);
});
