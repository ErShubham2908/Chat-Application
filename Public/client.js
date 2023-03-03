const socket = io();

let names;
let textArea = document.querySelector("#textarea");
let messageArea = document.querySelector('.item_message')
do{
    names = prompt('Enter Your name')
}while(!names);

textArea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user: names,
        message: message.trim()
    }
    // Append message
    appendMessage(msg, 'outgoing');

    // After press Enter clear string
    textArea.value = '';
    scrollMessage();

    // send to server

    socket.emit('message', msg)

}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message')

     let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
     `
     mainDiv.innerHTML = markup;

     messageArea.appendChild(mainDiv)
}

// Recieve Message
socket.on('message', (msg)=> {
    appendMessage(msg, 'incoming')
    scrollMessage();
})

function scrollMessage(){
    messageArea.scrollTop = messageArea.scrollHeight
}