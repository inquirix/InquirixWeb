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

const socket = io.connect('http://localhost:3000')

var message = document.getElementById('message'),
      handle = document.getElementById('handle').innerHTML,
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      helpMe = document.getElementById('help-me');

      document.getElementById('handle').remove();

helpMe.addEventListener('click', () => {
    socket.emit('SOS', {
        message : `${handle} needs help!`,
        sosType : data.questions[questionNum].type,
        linkToChat : window.location.href,
        chat_id : `#${data.questions[questionNum].type}`
    })
})

btn.addEventListener('click', () => {
    if(message.value != ""){
        socket.emit('chat', { //Sends data down socket
            message : message.value,
            handle : handle,
            chat_id: params.questionNum + handle
        });
        message.value = "";
    }
})

socket.on(`${params.questionNum + handle}`, (data) => {
    output.innerHTML += `<p id = 'cmessage'><strong id = "name">${data.handle} : </strong> ${data.message} </p>`;
})

const storeMessage = () => {
    
}