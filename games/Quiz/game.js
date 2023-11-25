const question = document.getElementById('Question');
const choices = Array.from(document.getElementsByClassName('suffix'));// to store all choices elements in the form of an array
const socreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const progressBarText = document.getElementById('progressText');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [{
    "question": "What is the primary role of the Kazakh language in various spheres of life?",
    "choice1": "Used across literature, art, cinema, music, science, and economics",
    "choice2": "Limited to public institutions",
    "choice3": "Exclusive to literature and art",
    "choice4": "Only relevant in educational institutions",
    "answer": 1
  },
  {
    "question": "What challenges are associated with the preservation and development of the Kazakh language?",
    "choice1": "Abundance of educational resources",
    "choice2": "Increasing knowledge among younger generations",
    "choice3": "Threat of replacement by other languages",
    "choice4": "Overwhelming support from mass media",
    "answer": 3
  },
  {
    "question": "How are measures taken to preserve and develop the Kazakh language?",
    "choice1": "Lack of language campaigns and state programs",
    "choice2": "Absence of educational materials and mass media in the Kazakh language",
    "choice3": "Ignoring the cultural aspects of the Kazakh language",
    "choice4": "Active promotion through language campaigns, state programs, and educational resources",
    "answer": 4
  },
  {
    "question": "In the international context, what role does the Kazakh language play?",
    "choice1": "Limited to local interactions",
    "choice2": "Important in intercultural exchange, translation, and business activities",
    "choice3": "Exclusive to business activities",
    "choice4": "No relevance in international conferences and seminars",
    "answer": 2
  },
  {
    "question": "Which project contributes to the promotion and use of the Kazakh language in various fields?",
    "choice1": "Kazaktagi kasipkerlik - an international translation initiative",
    "choice2": "Prompts to complete the statement",
    "choice3": "A project that ignores correct spelling and punctuation",
    "choice4": "Read with signs - focusing on children's books in other languages",
    "answer": 4
  }];//created a list of coded questions
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];//It is used to create shallow copy of js objects
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore',score);//adding score to localstorage
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressBarText.innerText = 'Question' + questionCounter + '/' + MAX_QUESTIONS;
    // increament progress bar
    progressBarFull.style.width = (questionCounter/MAX_QUESTIONS)*100+'%';//filling progress bar as we play the game
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);// It is used to get random question
    currentQuestion = availableQuesions[questionIndex];// To get current question
    question.innerText = currentQuestion.question;// getting question

    choices.forEach((choice) => {
        const number = choice.dataset.number;//to get the value to number data in each choices
        choice.innerText = currentQuestion['choice' + number];// to display each choice in choice box
    });
    availableQuesions.splice(questionIndex, 1);//to delete the current question from available questions
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;// to get the html element we clicked on
        const selectedAnswer = selectedChoice.dataset['number'];//Get the value corresponding to selected option
        const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";// check if answer is correct or not
        if (classToApply == "correct"){
            increamentScore(CORRECT_BONUS);
        }
    selectedChoice.parentElement.classList.add(classToApply);// apply correct or incorrect class on parent element
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);// to remove the added class after 1 second
    });
});

increamentScore = num => {
    score += num;
    socreText.innerText = score;//increamenting score
}
startGame();

// game.js

// Ваш текущий код для игры

// Счетчик вопросов
let questionCount = 0;

// Новый код для воспроизведения звука после пятого вопроса
function playVictorySound() {
  const audio = new Audio('pobeda.mp3');
  audio.play();
}

// Обработчик события для кнопки ответа
document.querySelectorAll('.choice-container').forEach(choice => {
  choice.addEventListener('click', () => {
    // Ваш текущий код для обработки ответа

    // Увеличиваем счетчик вопросов после каждого ответа
    questionCount++;

    // Проверяем, ответили ли на пятый вопрос
    if (questionCount === MAX_QUESTIONS) {
      playVictorySound();
    }
  });
});
