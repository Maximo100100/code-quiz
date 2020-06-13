var questionNum = 0;
var questions = [
    {
        q: "Commonly used data types do NOT include:",
        c: ["Strings", "Booleans", "Alerts", "Numbers"],
        a: "Alerts"
    },
    {
        q: "The condition in an if/else statement is enclosed within ______.",
        c: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
        a: "Parentheses"
    },
    {
        q: "Arrays in Javascript can be used to store ______.",
        c: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"],
        a: "All of the above"
    },
    {
        q: "String values must be enclosed within ______ when being assigned to variables.",
        c: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
        a: "Quotes"
    },
    {
        q: "A very useful tool used during development and degugging for printing content to the debugger is:",
        c: ["Javascript", "Terminal/Bash", "For loops", "Console.log"],
        a: "Console.log"
    },
];

var startBtn = document.getElementById("start-btn");
var submitBtn = document.getElementById("submit-btn");
var restartBtn = document.getElementById("restart-btn");
var clearBtn = document.getElementById("clear-btn");


var time = (questions.length * 10 + 1);

var timerEl = document.getElementById("timer");
var questionEL = document.getElementById("questions");
var answerEL = document.getElementById("answers");
var scoreEl = document.getElementById("player-score");

var submitScoreEl = document.querySelector("#submit-score");

var userNameInput;
var answer;


function startQuiz() {
    document.getElementById("home-sect").classList.add("hidden");
    document.getElementById("question-sect").classList.remove("hidden");
    startTimer();
    nextQuestion();
    answerEL.addEventListener("click", function (event) {
        var pEl= document.getElementById("feedback");
        
        if (answer === event.target.textContent) {   
            pEl.innerHTML = "Correct!";
            setTimeout(hideFeedback, 1000);   
            showFeedback();
        } 
        else {
            pEl.innerHTML = "Wrong!";
            setTimeout(hideFeedback, 1000);
            showFeedback();
            time = time - 10;
        }  
        nextQuestion();  
    });
}

function nextQuestion() {
    questionNum++;
    answer = questions[questionNum].a;
    questionEL.textContent = questions[questionNum].q;
    answerEL.innerHTML = "";
    
    var choices = questions[questionNum].c;

    for (var i = 0; i < choices.length; i++) {
        var nextChoice = document.createElement("button");
        
        nextChoice.textContent = choices[i]
        answerBtn = answerEL.appendChild(nextChoice).setAttribute("class", "btn");
    }
}

function startTimer() {
    var countdown = setInterval(function () {
    time--;
    timerEl.textContent = "Time: " + time;
        if (time <= 0 || questionNum === questions.length) {
            clearInterval(countdown);
            score();
            console.log("score function called")
        }
    }, 1000);
}

function hideFeedback(){
    var pEl= document.getElementById("feedback");
    pEl.style.display='none'
}

function showFeedback(){
    var pEl= document.getElementById("feedback");
    pEl.removeAttribute('style');
}

function score() {
    document.getElementById("question-sect").classList.add('hidden');
    document.getElementById("score-sect").classList.remove('hidden');
    scoreEl.textContent = "Your score is " + time + ".";
}

function addScore() {
    userNameInput = document.getElementById("player").value
var newScore = {
        name: userNameInput,
        score: time
    };
var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push(newScore)
    localStorage.setItem("highScores", JSON.stringify(highScores));
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
    scoreList = document.getElementById("score-list");

    highScores.sort(function (a,b){
        return b.score - a.score
    })

    for (var s = 0; s < highScores.length; s++) {
        var newLi = document.createElement("li")
        newLi.textContent = highScores[s].name + " - " + highScores[s].score
        scoreList.appendChild(newLi)
    }
}

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", function (event) {
    addScore();
    window.location.href = './highscores.html'
    console.log("FUck")
});
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    history.back()
});
restartBtn.addEventListener("click", function () {
    history.back();
});








// var restartBtn = document.querySelector("button.restartBtn"),
//     clearBtn = document.querySelector("button.clearBtn"),
//     // get the highScores list and turn it back into an object
//     highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
//     scoreList = document.getElementById("score-list");

//     // sort scores from high to low
//     highScores.sort(function (a,b){
//         return b.score - a.score
//     })

//     // display the scores
//     for (var s = 0; s < highScores.length; s++) {
//         var newLi = document.createElement("li")
//         newLi.textContent = highScores[s].name + " - " + highScores[s].score
//         scoreList.appendChild(newLi)
//     }

// function makeQuestions() {
//     questionNumber++;
//     answer = questions[questionNumber].answer

//     questionHead.textContent = questions[questionNumber].title;
//     answerChoices.innerHTML = "";

//     var choices = questions[questionNumber].choices;

//     for (var q = 0; q < choices.length; q++) {
//         var nextChoice = document.createElement("button");

//         nextChoice.textContent = choices[q]
//         answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
//     }
// }



// function hideFeedback(){
//     var pEl= document.getElementsByClassName("feedback")[0]
//     pEl.style.display='none'
// }

// function showFeedback(){
//     var pEl= document.getElementsByClassName("feedback")[0]
//     pEl.removeAttribute('style');
// }

// answerChoices.addEventListener("click", function (event) {
//     var pEl= document.getElementsByClassName("feedback")[0]
    
//     // evaluation of user's answer choices & feedback
//     if (answer === event.target.textContent) {   
//         pEl.innerHTML = "Correct!";
//         setTimeout(hideFeedback,1000);
//         showFeedback();   
//     } else {
//         pEl.innerHTML = "Sorry, that's incorrect.";
//         setTimeout(hideFeedback,1000);
//         secondsLeft = secondsLeft - 10;
//         showFeedback();
//     }    
//     makeQuestions();
// });
