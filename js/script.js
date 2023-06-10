var currentQuestionIndex = 0;
var startButton = document.getElementById("startButton");
var quizDescription = document.getElementById("quizDescription");
var questionWrap = document.getElementById("question_wrap");
var nextButton = document.getElementById("nextButton");
var highScoresButton = document.getElementById("highScoresButton");
var timerEl = document.getElementById("timer");
var timerInterval;
var score = 0;



startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);

questionWrap.style.display = "none";
nextButton.style.display = "none";


function startQuiz() {
    quizDescription.style.display = "none";
    startButton.style.display = "none";

    questionWrap.style.display = "block";
    nextButton.style.display = "block";

    startTimer();
    showQuestion();
    showChoices();
}


function startTimer() {
    var timeLeft = 60;

    timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.innerText = "TIME LEFT: " + timeLeft + "seconds";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}


function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
    showChoices();
}


function showQuestion() {
    var questionEl = document.querySelector("#question");
    questionEl.innerHTML = "";
    var questionDataObj = questionData[currentQuestionIndex];
    var questionH2 = document.createElement("h2");

    questionH2.innerText = questionDataObj.question;
    questionEl.append(questionH2);
}


function showChoices() {
    var questionChoicesEl = document.querySelector("#choices");
    questionChoicesEl.innerHTML = "";
    var questionDataObj = questionData[currentQuestionIndex];

    var choicesList = document.createElement("ol");

    for (var i = 0; i < questionDataObj.choices.length; i++) {
        var choice = questionDataObj.choices[i];

        var listItem = document.createElement("li");
        var btn = document.createElement("button");

        btn.innerText = choice;
        btn.classList.add("button-style");
        btn.addEventListener("click", checkAnswer);

        listItem.appendChild(btn);
        choicesList.appendChild(listItem);
    }

    questionChoicesEl.innerHTML = "";
    questionChoicesEl.appendChild(choicesList);
}


function checkAnswer(event) {
    var selectedChoice = event.target.innerText;
    var questionDataObj = questionData[currentQuestionIndex];

    if (selectedChoice === questionDataObj.answer) {
        score++;
    } else {
        var timeLeft = parseInt(timerEl.innerText.split(" ")[2]);
        timeLeft -=5;
        timerEl.innerText = "TIME LEFT: " + timeLeft + " seconds";
    }

    nextQuestion();
}


function applyButtonStyle() {
    var startButton = document.getElementById("startButton");
    startButton.classList.add("button-style");
}


function endQuiz() {
    clearInterval(timerInterval);
    questionWrap.style.display = "none";
    nextButton.style.display = "none";

    var resultDiv = document.createElement("div");
    var scoreText = document.createElement("p");
    var nameInput = document.createElement("input");

    resultDiv.classList.add("text_center");
    scoreText = "Time's up! Your final score is: " + currentQuestionIndex + "/" + questionData.length;
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Enter Your Name");

    resultDiv.append(scoreText, nameInput, submitButton);
    quizDescription.append(resultDiv);
}


function saveScore() {
    var nameInput = document.querySelector("input[type='text']");
    var initials = nameInput.ariaValueMax;
    var score = currentQuestionIndex;

    var scoreObj = { initials: initials, score: score };

    var scores = localStorage.getItem("scores");
    var scoreList;

    if (scores) {
        scoreList = JSON.parse(scores);
    } else {
        scoreList = [];
    }

    scoreList.push(newScore);

    localStorage.setItem("scores", JSON.stringify(scoreList));

}


showQuestion();
showChoices();
applyButtonStyle();