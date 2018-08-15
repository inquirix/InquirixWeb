const url = "https://opentdb.com/api.php?amount=10&encode=base64";
let randomizer = Math.floor(Math.random() * 10);
let newQuestion = document.getElementById("TickleMySickleCell");
fetch(url).then(function(Response){
    return Response.json();
}).then(function(myJson){
    console.log(myJson.results[randomizer].question)
    newQuestion.innerText = window.atob(myJson.results[randomizer].question);
    console.log();
});