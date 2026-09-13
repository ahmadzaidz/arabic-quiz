const MASTERY_THRESHOLD = 0.9; // 90%

let mainQueue = questions.map((q, i) => ({ ...q, id: i }));
let reviewQueue = [];
let currentPhase = “main”; // “main” | “review”
let currentIndex = 0;
let totalAnswered = 0;
let totalCorrect = 0;
let firstAttemptWrong = new Set();

const app = document.getElementById(“app”);

function getCurrentQueue() {
return currentPhase === “main” ? mainQueue : reviewQueue;
}

function render() {
const queue = getCurrentQueue();

if (currentIndex >= queue.length) {
if (currentPhase === “main” && reviewQueue.length > 0) {
currentPhase = “review”;
currentIndex = 0;
renderQuestion();
return;
}
renderResult();
return;
}
renderQuestion();
}

function renderQuestion() {
const queue = getCurrentQueue();
const q = queue[currentIndex];
const total = questions.length;
const posLabel = currentPhase === “main”
? `Question ${currentIndex + 1} of ${total}`
: `Review ${currentIndex + 1} of ${queue.length}`;

app.innerHTML = `${currentPhase === "review" ? '<div class="review-tag">Review round</div>' : ''} <div class="progress">${posLabel}</div> <div class="question">${q.question}</div> <div class="choices"> ${q.choices.map((c, i) =>`<button class="choice-btn" data-index="${i}">${c}</button>`).join("")} </div> <div class="feedback" id="feedback"></div> <button class="next-btn" id="nextBtn">Next</button> `;

document.querySelectorAll(”.choice-btn”).forEach(btn => {
btn.addEventListener(“click”, () => handleAnswer(q, parseInt(btn.dataset.index)));
});
}

function handleAnswer(q, chosenIndex) {
const buttons = document.querySelectorAll(”.choice-btn”);
buttons.forEach(b => b.disabled = true);

const isCorrect = chosenIndex === q.correctIndex;
buttons[q.correctIndex].classList.add(“correct”);
if (!isCorrect) {
buttons[chosenIndex].classList.add(“incorrect”);
}

totalAnswered++;
if (isCorrect) {
totalCorrect++;
} else if (currentPhase === “main”) {
firstAttemptWrong.add(q.id);
reviewQueue.push(q);
}

const feedback = document.getElementById(“feedback”);
feedback.classList.add(“show”, isCorrect ? “correct-fb” : “incorrect-fb”);
feedback.textContent = (isCorrect ? “Correct. “ : “Incorrect. “) + q.explanation;

const nextBtn = document.getElementById(“nextBtn”);
nextBtn.classList.add(“show”);
nextBtn.addEventListener(“click”, () => {
currentIndex++;
render();
});
}

function renderResult() {
const total = questions.length;
const firstPassScore = total - firstAttemptWrong.size;
const firstPassPct = Math.round((firstPassScore / total) * 100);
const mastered = firstPassPct >= MASTERY_THRESHOLD * 100;

app.innerHTML = `<div class="result-title">Quiz Complete</div> <div class="result-score">${firstPassScore} / ${total}</div> <div class="result-msg"> First-attempt score: ${firstPassPct}%<br> ${mastered ? "Mastery achieved (≥90%)." : "Below mastery threshold (90%). Review the missed questions above and retry."} </div> <button class="restart-btn" id="restartBtn">Restart Quiz</button>`;

document.getElementById(“restartBtn”).addEventListener(“click”, () => {
mainQueue = questions.map((q, i) => ({ ...q, id: i }));
reviewQueue = [];
currentPhase = “main”;
currentIndex = 0;
totalAnswered = 0;
totalCorrect = 0;
firstAttemptWrong = new Set();
render();
});
}

render();
