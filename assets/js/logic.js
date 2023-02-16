var endScreen = document.querySelector("#end-screen");
var startButton = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var choices = document.querySelector("#choices");
var questionTitle = document.querySelector("#question-title");
var questionWrap = document.querySelector("#questions");
var allQuestions = document.createElement("p");
var questionCounter = 0;
var current = questionBank[questionCounter];
var lengthOfOptions = questionBank[questionCounter].options.length;
var time = document.querySelector("#time");
var timerCount = 60;
var timerDecrement = -10;
var finalResultNum = localStorage.getItem("endTime");
var finalResultHTML = document.querySelector("#final-score");
var initials = document.querySelector("#initials")
var submitName = document.querySelector("#submit")


//Temporary variables

var getNum = document.querySelector("#getInterval");
// for (choiceCounter = 0; lengthOfOptions > choiceCounter; choiceCounter++){
//     choices.insertAdjacentHTML('afterbegin', `<li>${questionBank[questionCounter].options[choiceCounter]}</li>`);

// }};

//pause timer

// reduce time function

function reduceTimer() {
  timerCount = timerCount + timerDecrement;
  console.log(timerCount);
}

//Set save function
function saveQuizResult() {
//  var scoreArray = []
  var scoreArray = JSON.parse(window.localStorage.getItem("endTime")) || [] 
  var finalScore = {name: initials.value, score: timerCount}
  scoreArray.push(finalScore)
  

  localStorage.setItem("endTime", JSON.stringify(scoreArray));
}

submitName.onclick = saveQuizResult
//Step 6 set interval for timer

startButton.addEventListener("click", function () {
  var intervalID = setInterval(function () {
      timerCount -= 1;
      time.innerHTML = timerCount;

    
    if (timerCount <= 0 || questionBank.length - 1 === questionCounter) {
      console.log(questionBank.length - 1 === questionCounter);
      clearInterval(intervalID);
    }
  }, 1000);
});

///Step 5 go to the next question if the question hasnt ended
function nextQuestion(event, click) {
  if (questionBank.length - 1 === questionCounter) {
    endGame();
  } else {
    questionCounter++;
    showCurrentQuestion();
  }
}

//Strp 4 click event for choices

function selectAnswer() {
  var allLists = document.querySelectorAll("li");
  allLists.forEach((element, index) => {
    element.addEventListener("click", () => {
      if (index === questionBank[questionCounter].answer) {
        console.log("Correct");
        nextQuestion();
      } else {
        console.log("Incorrect");
        reduceTimer();
        nextQuestion();
      }
    });
  });
}

//Step 3 show current choices

function selectChoice() {
  choices.innerHTML = "";

  for (
    choiceCounter = 0;
    questionBank[questionCounter].options.length > choiceCounter;
    choiceCounter++
  ) {
    choices.insertAdjacentHTML(
      "beforeend",
      `<li class="listItems">${questionBank[questionCounter].options[choiceCounter]}</li>`
    );
  }
  selectAnswer();
}

//Step 2 show current question

function showCurrentQuestion() {
  questionTitle.innerHTML = current.question;
  selectChoice();
}

//Step 1 start quiz

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.classList.add("hide");
  questionWrap.classList.remove("hide");
  showCurrentQuestion();
}

///Step 4 repeat 1-3 until end of questionBank

///Step 5 give final score
function endGame() {
  // saveQuizResult();
  endScreen.classList.remove("hide");
  questionWrap.classList.add("hide");
  finalResultHTML.innerHTML = timerCount;

  console.log("the end");
}
///Step 1
