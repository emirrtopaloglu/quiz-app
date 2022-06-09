const quizData = [
    {
        question: "What is the capital of the United States?",
        answers: [
            {
                text: "Washington D.C.",
                correct: true
            },
            {
                text: "New York",
                correct: false
            },
            {
                text: "Los Angeles",
                correct: false
            },
        ],
    },
    {
        question: "What is the capital of France?",
        answers: [
            {
                text: "Ankara",
                correct: false
            },
            {
                text: "London",
                correct: false
            },
            {
                text: "Paris",
                correct: true
            },
        ],
    },
    {
        question: "What is the capital of Germany?",
        answers: [
            {
                text: "London",
                correct: false
            },
            {
                text: "Berlin",
                correct: true
            },
            {
                text: "Paris",
                correct: false
            },
        ],
    }
]

const correctCountEl = document.querySelector(".correct-counter");
const wrongCountEl = document.querySelector(".wrong-counter");
const timerCountEl = document.querySelector(".timer-counter");
const questionText = document.querySelector(".question-content");
const answerA = document.querySelector(".answer-a span");
const answerB = document.querySelector(".answer-b span");
const answerC = document.querySelector(".answer-c span");
const sendAnswer = document.querySelector("#send-answer");

let correctCounter = 0;
let wrongCounter = 0;

// Start
window.addEventListener("DOMContentLoaded", () => {
    renderQuestion();
    if (confirm("Ready to start?")) {
        startTimer();
    } else {
        alert("Goodbye!");
        document.querySelector(".wrapper").style.display = "none";
    }
});

// Timer
let timer = 60;
timerCountEl.textContent = timer;

// Start Timer
function startTimer() {
    setInterval(() => {
        timer--;
        timerCountEl.textContent = timer;
        if (timer === 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        }
    }, 1000);
}


// Questions
let questionIndex = 0;
let questionNumber = quizData.length;

function renderQuestion() {
    const question = quizData[questionIndex];
    questionText.textContent = question.question;
    answerA.textContent = question.answers[0]["text"];
    answerB.textContent = question.answers[1]["text"];
    answerC.textContent = question.answers[2]["text"];
}

// Send Answer
let userAnswer;

function selectedAnswer(input) {
    userAnswer = input.dataset.index;
}

sendAnswer.addEventListener("click", () => {
    const question = quizData[questionIndex];

    if (userAnswer == null) {
        alert("Select an answer!");
    }

    if (question.answers[userAnswer]["correct"]) {
        alert("It's true!");
        correctCounter++;
    } else {
        alert("It's wrong!");
        wrongCounter++;
    }
    setCounter(); // Set correct and wrong number;
    questionIndex++; // Set next question index

    if ( questionNumber - 1 < questionIndex ) {
        alert("Quiz is over! Your success rate: " + correctCounter + "/" + questionNumber);
        alert("Goodbye!");
        document.querySelector(".wrapper").style.display = "none";
        return false;
    } else {
        renderQuestion(); // Render next question
        userAnswer = null; // Remove user data
    }
});

// Set Counter
function setCounter() {
    correctCountEl.textContent = correctCounter + " correct";
    wrongCountEl.textContent = wrongCounter + " wrong";
}