const questions = [
    {
        question: "What is the size of int in Java?",
        options: ["16 bit", "32 bit", "64 bit", "128 bit"],
        answer: 1
    },
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
        question: "Which of these cannot be used for a variable name in Java?",
        options: ["identifier & keyword", "identifier", "keyword", "none of the mentioned"],
        answer: 2
    },
    {
        question: "What is the extension of java code files?",
        options: [".js", ".txt", ".class", ".java"],
        answer: 3
    },
    {
        question: "Which environment variable is used to set the java path?",
        options: ["MAVEN_Path", "JavaPATH", "JAVA", "JAVA_HOME"],
        answer: 3
    },
    {
        question: "Which of the following is not an OOPS concept in Java?",
        options: ["Polymorphism", "Inheritance", "Compilation", "Encapsulation"],
        answer: 2
    },
    {
        question: "What is Trunk in Java?",
        options: ["Heap", "Stack", "Memory", "None of the mentioned"],
        answer: 3
    },
    {
        question: "Which of these is a superclass of every class in Java?",
        options: ["ArrayList", "Abstract class", "Object class", "String"],
        answer: 2
    },
    {
        question: "Which of these packages contains the exception Stack Overflow in Java?",
        options: ["java.io", "java.system", "java.util", "java.lang"],
        answer: 3
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

function showResult() {
    let score = 0;
    questions.forEach((currentQuestion, questionIndex) => {
        const selectedOption = document.querySelector(`input[name="question${questionIndex}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === currentQuestion.answer) {
            score++;
        }
    });

    // Clear previous result
    resultContainer.innerHTML = "";

    let scoreElement = document.createElement('h3');
    scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
    resultContainer.appendChild(scoreElement);

    let reAttemptButton = document.createElement('button');
    reAttemptButton.classList.add('btn', 'btn-primary', 'p-1');
    reAttemptButton.textContent = 'Re-Attempt Test';
    reAttemptButton.addEventListener('click', renderAgain);

    resultContainer.appendChild(reAttemptButton);
    resultContainer.style.display = 'block';

    submitBtn.style.display = 'none';

    // Call fireCracker() three times with 500ms interval
    setTimeout(fireCracker, 0);     
    setTimeout(fireCracker, 600);   
}

submitBtn.addEventListener('click', showResult);

function renderAgain() {
    resultContainer.style.display = 'none';
    quizContainer.innerHTML = "";
    loadQuiz();
    submitBtn.style.display = 'block';
}

loadQuiz();

function fireCracker() {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
