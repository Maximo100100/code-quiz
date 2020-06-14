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

var startBtn = document.querySelector("button.start-btn");
var submitBtn = document.querySelector("button.submit-btn");
var restartBtn = document.querySelector("button.restart-btn");
var clearBtn = document.querySelector("button.clear-btn");


var time = (questions.length * 10 + 1);

var timerEl = document.getElementById("timer");
var questionEL = document.getElementById("questions");
var answerEL = document.getElementById("answers");
var scoreEl = document.getElementById("player-score");

var submitScoreEl = document.querySelector("#submit-score");

var userNameInput;
var answer;

highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
scoreList = document.getElementById("score-list");

highScores.sort(function (a,b){
    return b.score - a.score
})

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

// this took me so much time before i found a fix
if(startBtn){
    startBtn.addEventListener("click", startQuiz);
}
if(submitBtn){
    submitBtn.addEventListener("click", function (event) {
        window.location.href = './highscores.html'
        addScore();
});
}
if(clearBtn){
    clearBtn.addEventListener("click", function () {
        localStorage.clear();
        history.back()
    });
}
if(restartBtn){
    restartBtn.addEventListener("click", function () {
        history.back();
    });
}

// i did alot of googling to figure out this last chunk of code bc i had no idea 
// how to even aproach it 

function addScore () {
    userNameInput = document.getElementById("player").value
var playerScore = {
        name: userNameInput,
        score: time
    };
    // this "or" operator confuses me but i just took it from a method i saw on stackoverflow
var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push(playerScore)
    localStorage.setItem("highScores", JSON.stringify(highScores));
}


for (var s = 0; s < highScores.length; s++) {
    var newLi = document.createElement("li")
    newLi.textContent = highScores[s].name + " - " + highScores[s].score
    scoreList.appendChild(newLi)
}