const questions = [
    {
        question: "Which of the following is not a Java feature?",
        options: ["Object-oriented", "Use of pointers", "Portable", "Dynamic and Extensible"],
        answer: 1
    },
    {
        question: "Who invented Java?",
        options: ["Dennis Ritchie", "James Gosling", "Bjarne Stroustrup", "Ken Thompson"],
        answer: 1
    },
    {
        question: "What is the extension of Java code files?",
        options: [".js", ".txt", ".class", ".java"],
        answer: 3
    },
    {
        question: "Which of the following is not an OOPS concept in Java?",
        options: ["Polymorphism", "Inheritance", "Compilation", "Encapsulation"],
        answer: 2
    },
    {
        question: "Which of these is a superclass of every class in Java?",
        options: ["ArrayList", "Abstract class", "Object class", "String"],
        answer: 2
    }
];

const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const submitBtn = document.getElementById('submit-btn');

function loadQuiz() {
    quizContainer.innerHTML = ""; // Clear previous quiz
    questions.forEach((currentQuestion, questionIndex) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <h5>${questionIndex + 1}. ${currentQuestion.question}</h5>
            <ul class="options">
                ${currentQuestion.options.map((option, index) => `
                    <li>
                        <label>
                            <input type="radio" name="question${questionIndex}" value="${index}">
                            ${option}
                        </label>
                    </li>
                `).join('')}
            </ul>
        `;
        quizContainer.appendChild(questionElement);
    });
}

function showAnswer() {
    quizContainer.innerHTML = ""; // Clear quiz UI to show answers

    questions.forEach((currentQuestion, questionIndex) => {
        const selectedOption = document.querySelector(`input[name="question${questionIndex}"]:checked`);
        const isCorrect = selectedOption && parseInt(selectedOption.value) === currentQuestion.answer;

        // Create question block
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <h5>${questionIndex + 1}. ${currentQuestion.question}</h5>
            <ul class="options">
                ${currentQuestion.options.map((option, index) => `
                    <li style="color: ${index === currentQuestion.answer ? 'green' : (selectedOption && parseInt(selectedOption.value) === index ? 'red' : 'black')}">
                        ${option} ${index === currentQuestion.answer ? "(Correct Answer)" : ""}
                    </li>
                `).join('')}
            </ul>
        `;

        quizContainer.appendChild(questionElement);
    });

    // Add reattempt button
    let reAttemptButton = document.createElement('button');
    reAttemptButton.classList.add('btn', 'btn-primary', 'p-1');
    reAttemptButton.textContent = 'Re-Attempt Test';
    reAttemptButton.addEventListener('click', renderAgain);
    quizContainer.appendChild(reAttemptButton);
}

function showResult() {
    let score = 0;
    
    questions.forEach((currentQuestion, questionIndex) => {
        const selectedOption = document.querySelector(`input[name="question${questionIndex}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === currentQuestion.answer) {
            score++;
        }
    });

    // Display Score
    resultContainer.innerHTML = `<h3>Your Score: ${score} / ${questions.length}</h3>`;
    resultContainer.style.display = 'block';

    // Hide submit button
    submitBtn.style.display = 'none';

    // Fire confetti effect
    for (let count = 0; count < score; count++) {
        setTimeout(fireCracker, count * 100);
    }

    // Show answers
    showAnswer();
}

submitBtn.addEventListener('click', showResult);

function renderAgain() {
    resultContainer.style.display = 'none'; // Hide results
    quizContainer.innerHTML = ""; // Clear quiz content
    loadQuiz(); // Reload quiz questions
    submitBtn.style.display = 'block'; // Show submit button again
}

// Confetti animation
function fireCracker() {
    const count = 200,
        defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}

// Load quiz when page loads
loadQuiz();

