const socket =io()


let name;

//get the textarea in js format
let textarea =document.querySelector('#textarea')
//import
let mesageArea = document.querySelector('.message_area')

do {
    name = prompt('enter your name:')

}while(!name)

//while writing message- to check press enter key or not
textarea.addEventListener('keyup', (e) =>{
    if (e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})


function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim() // use for avoiding new line while press enter in messagebox
    }
    //append
    appendMessage(msg ,'outgoing')

    //to clear the textarea-
    textarea.value= ''
    //call the scrollTobottom
    scrollToBottom()

    //send to server
    //method 1 
    // socket.emit('message' ,{
    //     user: name,
    //     message: message
    // }) 
    //method 2
    socket.emit('message'. msg )
}

function appendMessage(msg, type){
    //creating div
    let mainDiv =document.createElement('div')
    let className =type
    //generate dynamic class
    mainDiv.classList.add(className, 'message')
    
    //
    let markup = `

        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    //insert into the maindiv
    mainDiv.innerHTML= markup

    //apppend to message area
    mesageArea.appendChild(mainDiv)
}

//receive message from users- run on browser only
socket.on('message', ()=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

//scroll to bottom while sending current message

function scrollToBottom(){
    messageArea.scrollTop =messageArea.scrollHeight
}