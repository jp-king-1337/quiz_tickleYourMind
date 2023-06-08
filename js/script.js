var h1 = document.querySelector("h1");
var choicesDiv = document.querySelector(".choices");

var currentQuestionIndex = 0;
var time = 50;
var timer;
var correct = "Three"


function showQuestion() {

}


function makeChoice(eventObj) {
    var btn = eventObj.target;
    var btnText = btn.innerText;

    if (btnText === correct) {
        console.log("Correct");
        endGame(false);
        currentQuestionIndex++;
        showQuestion();
    } else {
        console.log("Wrong...");
        time -= 5;
    }

    // if (currentQuestionIndex === questions.length - 1) {
    //     // They have answered all questions
    // }
}

function endGame(timeUp) {
    if (timeUp) {
        console.log("Time's up!");
    } else {
        console.log("You win!");
    }

    time = 50;
    clearInterval(timer);
}

function startTimer() {
    timer = setInterval(function () {
        // Decrease time by one
        time--;

        // Output time to the window
        h1.innerText = "Time: " + time;

        // Check if time is less than or equal to zero
        // If true, endGame()

        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

choicesDiv.addEventListener("click", makeChoice); startTimer();