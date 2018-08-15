const url = ["https://opentdb.com/api.php?amount=10&category=22&encode=base64" , "https://opentdb.com/api.php?amount=10&category=19&encode=base64" , "https://opentdb.com/api.php?amount=10&category=17&encode=base64" , "https://opentdb.com/api.php?amount=10&category=10&encode=base64"];
let randomizer = Math.floor(Math.random() * 10);
let linkRandomizer = Math.floor(Math.random() * url.length);
let newQuestion = document.getElementById("TickleMySickleCell");
fetch(url[linkRandomizer]).then(function(Response){
    return Response.json();
}).then(function(myJson){
    console.log(myJson.results[randomizer].question)
    newQuestion.innerText = window.atob(myJson.results[randomizer].question);
    console.log();
});

// fetch(url[linkRandomizer]).then(function(Response){
//     return Response.json();
// }).then(function(myJson){
//     if(myJson.results[randomizer].correct_answer == "True" || myJson.results[randomizer].correct_answer == "False"){
//         let selectedDiv = document.getElementById("TickelMySickleCell");

//     }
    
// });

