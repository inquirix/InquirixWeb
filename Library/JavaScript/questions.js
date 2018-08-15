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
}else if(data.questions[questionNum].graphType == "surface"){
    z1 = data.questions[questionNum].graphData;
    z2 = [];
    for (var i=0;i<z1.length;i++ ) { 
    z2_row = [];
    for(var j=0;j<z1[i].length;j++) { 
      z2_row.push(z1[i][j]+1);
    }
    z2.push(z2_row);
}

z3 = []
for (var i=0;i<z1.length;i++ ) { 
  z3_row = [];
    for(var j=0;j<z1[i].length;j++) { 
      z3_row.push(z1[i][j]-1);
    }
    z3.push(z3_row);
}
var data_z1 = {z: z1, type: 'surface'};
var data_z2 = {z: z2, showscale: false, opacity:0.9, type: 'surface'};
var data_z3 = {z: z3, showscale: false, opacity:0.9, type: 'surface'};


Plotly.newPlot('myDiv', [data_z1, data_z2, data_z3]);
}
document.getElementById('questionTitle').innerHTML = data.questions[questionNum].questionTitle;
document.getElementById('questionText').innerHTML = data.questions[questionNum].question;

document.getElementById('submit_button').addEventListener('click', () => {
    let answer = document.getElementById('answer_field').value;
    if(answer == data.questions[questionNum].questionAnswer){
        document.getElementById('questionTitle').innerHTML = "CORRECT!"
    }else{
        document.getElementById('questionTitle').innerHTML = "INCORRECT!"
    }
})