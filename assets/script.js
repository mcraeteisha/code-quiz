//Refence vars
var timerEl = document.querySelector(".time");
var question = document.getElementById("question");
var firstOption = document.getElementById("option-one");
var secondOption = document.getElementById("option-two");
var thirdOption = document.getElementById("option-three");
var fourthOption = document.getElementById("option-four");
var correct = document.getElementById("correct-answer");
var incorrect = document.getElementById("incorrect-answer");
var endOfGame = document.getElementById("end-game");

var secondsLeft = 76;

var questionCount = '';

var score = secondsLeft;


//Functions


function startTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time Left: " + secondsLeft;

        if(secondsLeft === 0 || secondsLeft < 1) {
          clearInterval(timerInterval);
          // Calls function to end game, display scores
          endGame();
        }

        if(questionCount === 5) {
            clearInterval(timerInterval);
            // Calls function to end game, display scores
            endGame();
        }

      }, 1000);
}

function wrongAnswer () {
    //Function should detract 10 seconds from timer
    incorrect.textContent = "Incorrect!";
    secondsLeft = secondsLeft - 10;
}

function rightAnswer() {
    //Function displays "Correct!" when right answer selected
    correct.textContent = "Correct!";
}


function endGame() {
    //Function should display score, which is seconds left (need to return this value on the page), show initial entry box
    var removeQuestions = document.getElementById("question-and-answer");
    removeQuestions.remove();
    endOfGame.textContent = "Your score is: " + score;
}


function generateQuestions() {
    startTimer();
    questionCount = 1;


    function questionOne() {
        question.textContent = "What does the following expression return? NaN === NaN;";
        firstOption.textContent = "True";
        secondOption.textContent = "False";
        thirdOption.textContent = "Undefined";
        fourthOption.textContent = "Not a Number";

        //Check for answer
        firstOption.addEventListener("click", wrongAnswer);
        secondOption.addEventListener("click", wrongAnswer);
        thirdOption.addEventListener("click", rightAnswer);
        fourthOption.addEventListener("click", wrongAnswer);
    }

questionOne();
}

function removeWelcome() {
    var welcomeMessage = document.getElementById("welcome");
    document.body.removeChild(welcomeMessage);
    generateQuestions();
}



//Call Functions and Event Listeners
var beginQuiz = document.getElementById("start-game");
beginQuiz.addEventListener('click', removeWelcome);