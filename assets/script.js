//Refence vars
var timerEl = document.querySelector(".time");
var timerDiv = document.getElementById ("timer");
var quizBodyDiv = document.getElementById("quiz-body");
var question = document.getElementById("question");
var firstOption = document.getElementById("option-one");
var secondOption = document.getElementById("option-two");
var thirdOption = document.getElementById("option-three");
var fourthOption = document.getElementById("option-four");
var correct = document.getElementById("correct-answer");
var endOfGame = document.getElementById("end-game");
var finalScore = document.getElementById("final-score");
var submitBtnEl = document.createElement("button");
var initialsLabel = document.getElementById("initials");
var highScoreOne = document.getElementById("high-score-1");
var highScoreTwo = document.getElementById("high-score-2");
var highScoreThree = document.getElementById("high-score-3");
const lineBreak = document.createElement("br");


var secondsLeft = 76;
var questionCount = '';
var questionIndex = 0;
var timerInterval;
var score;

//An array of quiz questions that display to the page via a function
const quizQuestions = [{
    question: "What does the following expression return? NaN===NaN;",
    optionA: "True",
    optionB: "False",
    optionC: "Undefined",
    optionD: "Not a Number",
    correctAnswer: "Undefined"
  },
  {
    question: "What declaration should all HTML files start with?",
    optionA: "http://",
    optionB: "DOCTYPE",
    optionC: "index.html",
    optionD: "This is an HTML file.",
    correctAnswer: "DOCTYPE"
  },
  {
    question: "What is the file extension used for JavaScript files",
    optionA: ".java",
    optionB: ".javascript",
    optionC: ".jscr",
    optionD: ".js",
    correctAnswer: ".js"
  },
  {
    question: "What does the following expression return? typeof('pizza')",
    optionA: "string",
    optionB: "cheese",
    optionC: "boolean",
    optionD: "pizza",
    correctAnswer: "string"
  },
  {
    question: "How should you start a single-line comment in JavaScript?",
    optionA: "**",
    optionB: "/*",
    optionC: "!--",
    optionD: "//",
    correctAnswer: "//"
  }]


//Functions

//This function starts the timer and ends the game if time runs out
function startTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time Left: " + secondsLeft;

        if(secondsLeft === 0 || secondsLeft < 1) {
          clearInterval(timerInterval);
          // Calls function to end game, display scores
          endGame();
        }

        /*if(questionCount === 5) {
            clearInterval(timerInterval);
            // Calls function to end game, display scores
            endGame();
        }*/

      }, 1000);
}

//This function checks answer based on what the user clicked vs. the correct answer stored in our array
function clickResult(event) {
    //Function should detract 10 seconds from timer
    var userClicked = event.target.textContent;
    var correctAnswer = quizQuestions[questionIndex].correctAnswer;
    if (userClicked === correctAnswer) {
        correct.textContent = "Correct!";
    } else {
        correct.textContent = "Incorrect!";
        secondsLeft = secondsLeft - 10;
    }
    questionIndex++;
    generateQuestions();

    console.log(questionIndex);

    if (questionIndex >= 4) {
        endGame();
    }
}


//Function removes correct/incorrect answer display, removes timer, removes questions, displays Score and allows user to submit score.
function endGame() {
    //Function should display score, which is seconds left (need to return this value on the page), show initial entry box
    correct.style.display = "none";
    removeTimer();
    var removeQuestions = document.getElementById("question-and-answer");
    removeQuestions.remove();

    var score = secondsLeft;
    endOfGame.textContent = "Your score is: ";
    finalScore.textContent = score;
    initialsLabel.textContent = "Game over! Enter your initials to save your score:";
    initialsLabel.appendChild(lineBreak);

    submitScore();
}

//This function creates a text input field for users to put their initials and calls the submit button function
function submitScore() {
    var textInputEl = document.createElement("input");
    var position = document.getElementsByTagName("label")[0];
    position.appendChild(textInputEl);
    textInputEl.classList.add('initialInput');
    createSubmitBtn();
}


//Creates a submit button that allows users to submit their score
function createSubmitBtn() {
    var positionNext = document.getElementsByTagName("label")[0];
    positionNext.appendChild(submitBtnEl);
    submitBtnEl.textContent = "Submit Score";
}


//removes Welcome Message when the game begins
function removeWelcome() {
    var welcomeMessage = document.getElementById("welcome");
    document.body.removeChild(welcomeMessage);
}


//removes Timer. Function called when game ends.
function removeTimer() {
    document.body.removeChild(timerDiv);
}


//This function starts the game. Removes welcome message, sets question index to 0, starts timer, and generates quiz questions.
function startGame() {
    removeWelcome();
    questionIndex = 0;
    startTimer();
    generateQuestions();
}


//Generates questions from our array
function generateQuestions() {
    var currentQuestion = quizQuestions[questionIndex];
        question.textContent = currentQuestion.question;
        firstOption.textContent = currentQuestion.optionA;
        secondOption.textContent = currentQuestion.optionB;
        thirdOption.textContent = currentQuestion.optionC;
        fourthOption.textContent = currentQuestion.optionD;

}


function renderHighScores() {
    var submittedInitials = localStorage.getItem("initials");
    var savedScore = localStorage.getItem("score");

    highScoreOne.textContent = submittedInitials + ": " + savedScore;
}


//Upon clicking the 'Submit Score' button, the user's score is saved and High scores are displayed.
submitBtnEl.addEventListener("click", function(event) {
    event.preventDefault();

    var userInitials = document.querySelector(".initialInput").value;

    var yourScore = finalScore.textContent;

    if (userInitials === "") {
        alert("Error. Initials cannot be blank!");}
        else {alert("Score submitted and initials saved!");}

        localStorage.setItem("initials", userInitials);
        localStorage.setItem("score", yourScore);

renderHighScores();        
 });



//Call Functions and Event Listeners
var beginQuiz = document.getElementById("start-game");
beginQuiz.addEventListener('click', startGame);

firstOption.addEventListener("click", clickResult);
secondOption.addEventListener("click", clickResult);
thirdOption.addEventListener("click", clickResult);
fourthOption.addEventListener("click", clickResult);
