var currentQuestionIndex = 0;

// Building a function to show the question. Will try to comment my code as I go and then remove comments after committing the changes.
function showQuestion() {
    // variable to select the element with id of question
    var questionEl = document.querySelector("#question");
    // reset innerHTML
    questionEl.innerHTML = "";
    // variable to select the current object from the questionData array
    var questionObj = questionData[currentQuestionIndex];
    // create the h2 to hold the question
    var questionH2 = document.createElement("h2");

    // h2 text should pull from questionObj and append to the questionEl
    questionH2.innerText = questionObj.question;
    questionEl.append(questionH2);
}