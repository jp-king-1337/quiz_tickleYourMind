var currentQuestionIndex = 0;

// Building a function to show the question. Will try to comment my code as I go and then remove comments after committing the changes.
function showQuestion() {
    // variable to select the element with id of question
    var questionEl = document.querySelector("#question");
    // reset innerHTML
    questionEl.innerHTML = "";
    // variable to select the current object from the questionData array
    var questionDataObj = questionData[currentQuestionIndex];
    // create the h2 to hold the question
    var questionH2 = document.createElement("h2");

    // h2 text should pull from questionDataObj and append to the questionEl
    questionH2.innerText = questionDataObj.question;
    questionEl.append(questionH2);
}

// Function to show the choices in buttons.
function showChoices() {
    var questionChoicesEl = document.querySelector("#choices");
    questionChoicesEl.innerHTML = "";
    var questionDataObj = questionData[currentQuestionIndex];
  
    var choicesList = document.createElement("ol");
  
    for (var i = 0; i < questionDataObj.choices.length; i++) {
      var choice = questionDataObj.choices[i];
  
      var listItem = document.createElement("li");
      var btn = document.createElement("button");
      btn.style.width = "50%";
      btn.style.backgroundColor = "#301934";
      btn.style.color = "#fff";
  
      btn.innerText = choice;
  
      listItem.appendChild(btn);
      choicesList.appendChild(listItem);
    }
  
    questionChoicesEl.innerHTML = "";
    questionChoicesEl.appendChild(choicesList);
  }
  



showQuestion();
showChoices();