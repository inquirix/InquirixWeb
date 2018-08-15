let questionNumHolder = document.getElementById('qNum');
const questionNum = parseInt(questionNumHolder.innerHTML);
questionNumHolder.remove();

if(data.questions[questionNum].graphType == "bar"){
    console.log(data.questions[questionNum].graphData);
    var gData = data.questions[questionNum].graphData;
    Plotly.newPlot('myDiv', gData);
}else if(data.questions[questionNum].graphType == "scatter"){
    var gData = [];
    for(let dataSet of data.questions[questionNum].graphData){
        gData.push(dataSet);
    }
    Plotly.newPlot('myDiv', gData);
}else if(data.questions[questionNum].graphType == "pie"){
    var gData = data.questions[questionNum].graphData;
    var layout = data.questions[questionNum].layout;
    Plotly.newPlot('myDiv', gData, layout);
}

document.getElementById('questionText').innerHTML = data.questions[questionNum].question;

document.getElementById('submit_button').addEventListener('click', () => {
    let answer = document.getElementById('answer_field').value;
    if(answer == data.questions[questionNum].questionAnswer){
        document.getElementById('questionTitle').innerHTML = "CORRECT!"
    }else{
        document.getElementById('questionTitle').innerHTML = "INCORRECT!"
    }
})