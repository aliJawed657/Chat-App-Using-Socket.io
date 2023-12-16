const socket = io()
let names;
let textarea = document.querySelector("#textarea")
let messageArea = document.querySelector(".message__area")
do {
    names = prompt("Please Enter Your Name")
} while (!names)

textarea.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: names,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing')

    textarea.value = ""
    scrollToBottom()

    socket.emit('message', msg)
}
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <span class="username">${msg.user}</span>
    <p class="user-message">${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Receive message 

socket.on("message", (msg) => {
    appendMessage(msg, "incoming")
    scrollToBottom()

})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}