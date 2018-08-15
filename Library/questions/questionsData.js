const data = {
    "questions" : [
        {
            "question" : "A new zoo has opened up and they have hired you to find out how many animals are in the zoo. So far the zoo has 3 groups of animals: griaffes, hippos, and mokeys. Which animal does the zoo have the most of? ",
            "questionAnswer" : "monkeys",
            "questionTitle" : "Zoo Animals",
            "graphType" : "bar",
            "graphData" : [{
                "x": ["giraffes", "hippos", "monkeys"],
                "y": [20, 14, 23],
                "type": "bar"
            }]
        },
        {
            "question" : "This line starts at (0,0) and ends ate (50,68). Calculate the slope of the line.",
            "questionAnswer" : "1.36",
            "questionTitle" : "Slope #01",
           "graphType" : "scatter",
           "graphData" : 
                [
                    {
                        "x": [0, 50],
                        "y": [0, 68],
                        "type": "scatter",
                    },
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
           },
           {    
               "questionTitle" : "Multi-plane visualization #01", 
                "questionAnswer" : "idk",
               "question" : "Sequence An for non-negative integer n is such that",
               "graphType" : "surface",
               "graphData" : z1 = [
                [8.83,8.89,8.81,8.87,8.9,8.87],
                [8.89,8.94,8.85,8.94,8.96,8.92],
                [8.84,8.9,8.82,8.92,8.93,8.91],
                [8.79,8.85,8.79,8.9,8.94,8.92],
                [8.79,8.88,8.81,8.9,8.95,8.92],
                [8.8,8.82,8.78,8.91,8.94,8.92],
                [8.75,8.78,8.77,8.91,8.95,8.92],
                [8.8,8.8,8.77,8.91,8.95,8.94],
                [8.74,8.81,8.76,8.93,8.98,8.99],
                [8.89,8.99,8.92,9.1,9.13,9.11],
                [8.97,8.97,8.91,9.09,9.11,9.11],
                [9.04,9.08,9.05,9.25,9.28,9.27],
                [9,9.01,9,9.2,9.23,9.2],
                [8.99,8.99,8.98,9.18,9.2,9.19],
                [8.93,8.97,8.97,9.18,9.2,9.18]
            ]
            
           }

    ]
}