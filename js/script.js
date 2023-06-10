var currentQuestionIndex = 0;


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

        listItem.appendChild(btn);
        choicesList.appendChild(listItem);
    }

    questionChoicesEl.innerHTML = "";
    questionChoicesEl.appendChild(choicesList);
}


function applyButtonStyle() {
    var startButton = document.getElementById("startButton");
    startButton.classList.add("button-style");
}


showQuestion();
showChoices();
applyButtonStyle();