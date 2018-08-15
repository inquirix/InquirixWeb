const data = {
    "questions" : [
        {
            "question" : "A new zoo has opened up and they have hired you to find out how many animals are in the zoo. So far the zoo has 3 groups of animals: griaffes, hippos, and mokeys. Which animal does the zoo have the most of? ",
            "questionAnswer" : "monkeys",
            "graphType" : "bar",
            "graphData" : [{
                "x": ["giraffes", "hippos", "monkeys"],
                "y": [20, 14, 23],
                "type": "bar"
            }]
        },
        {
           "graphType" : "scatter",
           "graphData" : 
                [
                    {
                        "x": [1, 2, 3, 4],
                        "y": [10, 15, 13, 17],
                        "type": "scatter"
                    },
                    {
                        "x": [1, 2, 3, 4],
                        "y": [16, 5, 11, 9],
                        "type": "scatter"
                    },
                    {
                        "x": [16, 22, 43, 4],
                        "y": [1, 4, 1, 19],
                        "type": "scatter"
                    }
                ]
           },
           {
                "graphType" : "pie",
                "graphData" : [{
                    values: [19, 26, 55],
                    labels: ['Residential', 'Non-Residential', 'Utility'],
                    type: 'pie'
                  }],
                "layout" : {
                    height: 400,
                    width: 500
                  }
           }

    ]
}