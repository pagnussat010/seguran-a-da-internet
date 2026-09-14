const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
const isOpen = nav.classList.toggle("active");

menuButton.setAttribute("aria-expanded", isOpen);
menuButton.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
);

menuButton.textContent = isOpen ? "✕" : "☰";

});

/* Fechar menu ao clicar em um link */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {
link.addEventListener("click", () => {

    nav.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");

    menuButton.textContent = "☰";
});

});

/* =========================================
QUIZ
========================================= */

const questions = [

{
    question: "Qual destas é uma boa prática para criar uma senha?",

    answers: [
        "Usar 123456 em todas as contas.",
        "Usar uma senha diferente e difícil de adivinhar.",
        "Usar apenas o próprio nome.",
        "Usar a data de nascimento."
    ],

    correct: 1
},

{
    question:
        "Você recebe uma mensagem dizendo que ganhou um prêmio, mas precisa pagar uma taxa para receber. O que deve fazer?",

    answers: [
        "Pagar imediatamente.",
        "Enviar seus dados pessoais.",
        "Desconfiar e verificar a informação por um canal oficial.",
        "Compartilhar a mensagem com todos os amigos."
    ],

    correct: 2
},

{
    question:
        "Um suposto funcionário do banco pede sua senha pelo telefone. O que você deve fazer?",

    answers: [
        "Informar a senha.",
        "Informar apenas parte da senha.",
        "Enviar uma foto do cartão.",
        "Não fornecer a senha e procurar o banco por um canal oficial."
    ],

    correct: 3
},

{
    question:
        "Por que é importante manter o celular e o computador atualizados?",

    answers: [
        "Somente para deixar o aparelho mais bonito.",
        "Porque atualizações podem corrigir falhas de segurança.",
        "Para aumentar automaticamente o número de contatos.",
        "Não existe motivo."
    ],

    correct: 1
},

{
    question:
        "Um familiar manda uma mensagem dizendo que perdeu o celular e precisa de dinheiro urgentemente. O que fazer?",

    answers: [
        "Transferir imediatamente.",
        "Pedir a senha da conta bancária.",
        "Confirmar a identidade da pessoa por outro meio antes de enviar dinheiro.",
        "Ignorar para sempre."
    ],

    correct: 2
},

{
    question:
        "Qual atitude é mais segura ao receber um link de uma pessoa desconhecida?",

    answers: [
        "Clicar imediatamente.",
        "Baixar todos os arquivos.",
        "Enviar o link para outras pessoas.",
        "Não clicar e verificar a origem da mensagem."
    ],

    correct: 3
}

];

/* =========================================
ELEMENTOS DO QUIZ
========================================= */

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextButton");

const questionCounter = document.getElementById("questionCounter");
const progressFill = document.getElementById("progressFill");

const quizContainer = document.getElementById("quizContainer");
const quizResult = document.getElementById("quizResult");

const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

/* =========================================
VARIÁVEIS
========================================= */

let currentQuestion = 0;
let score = 0;
let selectedAnswer = false;

/* =========================================
INICIAR QUIZ
========================================= */

function startQuiz() {

currentQuestion = 0;
score = 0;
selectedAnswer = false;

quizContainer.hidden = false;
quizResult.hidden = true;

showQuestion();

}

/* =========================================
MOSTRAR PERGUNTA
========================================= */

function showQuestion() {

selectedAnswer = false;

const question = questions[currentQuestion];

questionElement.textContent = question.question;

answersElement.innerHTML = "";

nextButton.disabled = true;

questionCounter.textContent =
    `Pergunta ${currentQuestion + 1} de ${questions.length}`;

const progress =
    ((currentQuestion + 1) / questions.length) * 100;

progressFill.style.width = `${progress}%`;


question.answers.forEach((answer, index) => {

    const button = document.createElement("button");

    button.classList.add("answer");

    button.type = "button";

    button.textContent = answer;

    button.addEventListener("click", () => {
        selectAnswer(index);
    });

    answersElement.appendChild(button);

});

}

/* =========================================
SELECIONAR RESPOSTA
========================================= */

function selectAnswer(selectedIndex) {

if (selectedAnswer) {
    return;
}

selectedAnswer = true;

const question = questions[currentQuestion];

const answerButtons =
    document.querySelectorAll(".answer");

answerButtons.forEach(button => {
    button.disabled = true;
});


if (selectedIndex === question.correct) {

    answerButtons[selectedIndex].classList.add("correct");

    score++;

} else {

    answerButtons[selectedIndex].classList.add("wrong");

    answerButtons[question.correct].classList.add("correct");
}

nextButton.disabled = false;

}

/* =========================================
PRÓXIMA PERGUNTA
========================================= */

nextButton.addEventListener("click", () => {

currentQuestion++;

if (currentQuestion < questions.length) {

    showQuestion();

} else {

    showResult();
}

});

/* =========================================
MOSTRAR RESULTADO
========================================= */

function showResult() {

quizContainer.hidden = true;

quizResult.hidden = false;

scoreElement.textContent =
    `${score}/${questions.length}`;


const percentage =
    (score / questions.length) * 100;


if (percentage === 100) {

    resultIcon.textContent = "🏆";

    resultTitle.textContent =
        "Excelente!";

    resultMessage.textContent =
        "Você demonstrou que conhece muito bem os principais cuidados para navegar com segurança.";

} else if (percentage >= 70) {

    resultIcon.textContent = "👏";

    resultTitle.textContent =
        "Muito bem!";

    resultMessage.textContent =
        "Você conhece boas práticas de segurança. Continue atento aos golpes e mensagens suspeitas.";

} else if (percentage >= 50) {

    resultIcon.textContent = "🙂";

    resultTitle.textContent =
        "Bom começo!";

    resultMessage.textContent =
        "Você já sabe algumas coisas importantes, mas vale revisar as dicas de segurança.";

} else {

    resultIcon.textContent = "📚";

    resultTitle.textContent =
        "Vamos aprender mais!";

    resultMessage.textContent =
        "Não se preocupe. Volte às dicas do site e tente o quiz novamente.";
}

}

/* =========================================
REINICIAR QUIZ
========================================= */

restartButton.addEventListener("click", () => {

startQuiz();

document
    .getElementById("quiz")
    .scrollIntoView({
        behavior: "smooth"
    });

});

/* =========================================
INICIAR
========================================= */

startQuiz();