//mack connection
function getUrlParams(search) {
    let hashes = search.slice(search.indexOf('?') + 1).split('&')
    let params = {}
    hashes.map(hash => {
        let [key, val] = hash.split('=')
        params[key] = decodeURIComponent(val)
    })
    return params;
}
let params = getUrlParams(window.location.search);
console.log(params);

document.getElementById('chatName').innerHTML = `#${params.chat_id}`;

const socket = io.connect('http://localhost:3000')

var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');

btn.addEventListener('click', () => {
    if(message.value != ""){
        socket.emit('chat', { //Sends data down socket
            message : message.value,
            handle : handle.innerHTML,
            chat_id: params.chat_id
        });
        message.value = "";
    }
})

socket.on(params.chat_id, (data) => {
    output.innerHTML += `<p id = 'cmessage'><strong id = "name">${data.handle} : </strong> ${data.message} </p>`;
})

const storeMessage = () => {
    
}