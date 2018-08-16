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

fetch(url[linkRandomizer]).then(function(Response){
    return Response.json();
}).then(function(myJson){
    let selectedDiv = document.getElementById("TickelMySickleCell");
    if(myJson.results[randomizer].correct_answer == "True" || myJson.results[randomizer].correct_answer == "False"){
        let truth = createElement("input");
        let fake = createElement("input");
        truth.type = "radio";
        fake.type = "radio";
        truth.innerText = "True";
        fake.innerText = "False";
        selectedDiv.appendChild(truth);
        selectedDiv.appendChild(fake);
    }else {
        let arr = [];
        let newRand = Math.floor(Math.random() * 3);
        let zero = createElement("input");
        let one= createElement("input");
        let two = createElement("input");
        let three = createElement("input");
        zero.type = "radio";
        one.type = "radio";
        two.type = "radio";
        three.type = "radio";
        for(let  i = 0; i < 3; i++){
            arr[i] += myJson.results[randomizer].incorrect_answers
        }
        arr.splice(0, newRand);

        for(let i = 0; i < arr.length; i++ ){
            i.innerText = arr[i];
        }

        selectedDiv.appendChild(zero);
        selectedDiv.appendChild(one);
        selectedDiv.appendChild(two);
        selectedDiv.appendChild(three);
        console.log(zero);
        console.log(one);
        console.log(two);
        console.log(three);
    }

    
});

