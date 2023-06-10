var currentQuestionIndex = 0;
var startButton = document.getElementById("startButton");
var quizDescription = document.getElementById("quizDescription");
var questionWrap = document.getElementById("question_wrap");
var highScoresButton = document.getElementById("highScoresButton");
var timerEl = document.getElementById("timer");
var nameInput;
var timerInterval;
var score = 0;



startButton.addEventListener("click", startQuiz);
highScoresButton.addEventListener("click", showHighScores);

questionWrap.style.display = "none";


function startQuiz() {
    quizDescription.style.display = "none";
    startButton.style.display = "none";

    questionWrap.style.display = "block";

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


function showQuestion() {
    var questionEl = document.querySelector("#question");
    questionEl.innerHTML = "";

    if (currentQuestionIndex < questionData.length) {
        var questionDataObj = questionData[currentQuestionIndex];
        var questionH2 = document.createElement("h2");

        questionH2.innerText = questionDataObj.question;
        questionEl.append(questionH2);
    }
}


function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questionData.length) {
        showQuestion();
        showChoices();
    } else {
        endQuiz();
    }
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
    var selectedChoice = event.target;
    var questionDataObj = questionData[currentQuestionIndex];

    if (selectedChoice.innerText === questionDataObj.answer) {
        score++;
        selectedChoice.className += " correct";
        showResult(selectedChoice, true);
    } else {
        var timeLeft = parseInt(timerEl.innerText.split(" ")[2]);
        timeLeft -= 5;
        timerEl.innerText = "TIME LEFT: " + timeLeft + " seconds";
        selectedChoice.className += " wrong";
        showResult(selectedChoice, false);
    }

    nextQuestion();
}

function showResult(selectedChoice, isCorrect) {
    var resultDiv = document.createElement("div");
    var resultText = document.createElement("p");

    resultDiv.classList.add("text_center");
    resultText.innerText = isCorrect ? "Correct!" : "Wrong!";

    resultDiv.appendChild(resultText);
    questionWrap.appendChild(resultDiv);

    setTimeout(function () {
        resultDiv.remove();
    }, 1000);
}



function applyButtonStyle() {
    var startButton = document.getElementById("startButton");
    startButton.classList.add("button-style");
}


var scoreboardDiv = document.createElement("div");
scoreboardDiv.id = "scoreboard";
scoreboardDiv.classList.add("text_center");
document.body.appendChild(scoreboardDiv);


// STOP REMOVING THE SUBMIT BUTTON YOU DUMMY
// It's there to submit score info, not to end the quiz.
function endQuiz() {
    clearInterval(timerInterval);
    questionWrap.style.display = "none";

    scoreboardDiv.innerHTML = "";

    var resultDiv = document.createElement("div");
    var scoreText = document.createElement("p");
    nameInput = document.createElement("input");
    var submitButton = document.createElement("button");

    resultDiv.classList.add("text_center");
    scoreText.innerText = "Time's up! Your final score is: " + currentQuestionIndex + "/" + questionData.length;
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Enter Your Initials");
    submitButton.textContent = "Submit"
    submitButton.addEventListener("click", saveScore);

    resultDiv.append(scoreText, nameInput, submitButton);
    scoreboardDiv.append(resultDiv);

    nameInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            saveScore();
        }
    });
}


function saveScore() {
    var initials = nameInput.value;
    var scoreObj = {
        initials: initials,
        score: score
    };

    var scores = localStorage.getItem("scores");
    var scoreList;

    if (scores) {
        scoreList = JSON.parse(scores);
    } else {
        scoreList = [];
    }

    scoreList.push(scoreObj);

    localStorage.setItem("scores", JSON.stringify(scoreList));

    nameInput.value = "";

    showHighScores();
}


function showHighScores() {
    scoreboardDiv.innerHTML = "";
    var scores = localStorage.getItem("scores");
    var scoreList;

    if (scores) {
        scoreList = JSON.parse(scores);

        var highScoresTitle = document.createElement("h2");
        highScoresTitle.innerText = "High Scores";
        scoreboardDiv.appendChild(highScoresTitle);

        var scoreTable = document.createElement("table");
        scoreTable.classList.add("score_table");

        var tableHeaderRow = document.createElement("tr");
        var initialsHeader = document.createElement("th");
        var scoreHeader = document.createElement("th");
        initialsHeader.innerText = "Initials";
        scoreHeader.innerText = "Score";
        tableHeaderRow.append(initialsHeader, scoreHeader);
        scoreTable.appendChild(tableHeaderRow);

        scoreList.forEach(function (scoreObj) {
            var tableRow = document.createElement("tr");
            var initialsData = document.createElement("td");
            var scoreData = document.createElement("td");
            initialsData.innerText = scoreObj.initials;
            scoreData.innerText = scoreObj.score;
            tableRow.append(initialsData, scoreData);
            scoreTable.appendChild(tableRow);
        });

        scoreboardDiv.appendChild(scoreTable);
    }
}




showQuestion();
showChoices();
applyButtonStyle();