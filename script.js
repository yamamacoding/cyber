// Define the questions for the console.log("Script is connected!");
console.log("Script is connected!");

const quizData = [
    {
        question: "Does your organization have a formalized risk management framework for cybersecurity?",
        answers: [
            { text: "Yes, fully implemented", correct: true },
            { text: "Yes, partially implemented", correct: false },
            { text: "No, but in progress", correct: false },
            { text: "No", correct: false },
        ],
    },
    {
        question: "To what extent has your government agency implemented cybersecurity performance goals (CPGs)?",
        answers: [
            { text: "Fully implemented", correct: true },
            { text: "Partially implemented", correct: false },
            { text: "No, but planning to implement", correct: false },
            { text: "No", correct: false },
        ],
    },
    {
        question: "How often does senior leadership review cybersecurity risks and strategies?",
        answers: [
            { text: "Monthly", correct: true },
            { text: "Quartely", correct: false },
            { text: "Annually", correct: false },
            { text: "Rarely or Never", correct: false },
        ],
    },
];

// Select the HTML elements
const questionContainer = document.querySelector(".questions");
const resultsContainer = document.querySelector(".results");
const restartButton = document.querySelector("#restart");
const totalSpan = document.querySelector("#total");
const correctSpan = document.querySelector("#correct");

// Define global variables
let currentQuestionIndex = 0;
let numCorrect = 0;

// Function to populate the HTML with question and answer options
function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerHTML = `
        <p>${currentQuestion.question}</p>
        <ul>
            ${currentQuestion.answers.map(answer => `
                <li>
                    <button class="answer-btn">${answer.text}</button>
                </li>
            `).join("")}
        </ul>
    `;
    const answerButtons = document.querySelectorAll(".answer-btn");
    answerButtons.forEach(button => {
        button.addEventListener("click", checkAnswer);
    }); 
}

// Function to check the selected answer and update global variables accordingly
function checkAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = quizData[currentQuestionIndex].answers.find(answer => answer.text === selectedButton.textContent).correct;
    if (isCorrect) {
        numCorrect++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === quizData.length) {
        showResults();
    } else {
        showQuestion();
    }
}

// Function to display the final quiz results
function showResults() {
    questionContainer.style.display = "none";
    resultsContainer.style.display = "block";
    totalSpan.textContent = quizData.length;
    correctSpan.textContent = numCorrect;
}

// Add event listener to restart the quiz
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    numCorrect = 0; // Reset the number of correct answers
    resultsContainer.style.display = "none";
    questionContainer.style.display = "block"; // Show the question container
    showQuestion(); // Show the first question again
});

// Call this function when the page loads to show the first question
showQuestion();