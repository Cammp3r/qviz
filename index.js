const nextButton = document.getElementById("next_button");
const questionName = document.getElementById("question_name");
const option = document.getElementById("option");

const questionNames = [
    {
        text: "Делай, как надо. Как...",
        correct: 0
    },
    {
        text: "Работа - это не волк. Работа - ...",
        correct: 2
    },
    {
        text: "Не каждый может взвалить на себя груз ответственности, а я ...",
        correct: 1
    },
    {
        text: "Если обидели- не обижайся, Если ударили ...",
        correct: 3
    }
];

const options = [
{text: "не надо, не делай" },
{text: "навалил груз на детской площадке"},
{text: "это ворк"},
{text: "не ударяйся"}
]

let currentIndex = 0;
let selectedIndex = null;
let score = 0;
let submitted = false;

function renderQuestion(i) {
    const q = questionNames[i];
    questionName.innerText = q.text;
    option.style.display = "";
    option.innerHTML = "";

    const answerList = Array.isArray(q.options) && q.options.length ? q.options : options.map(o => o.text);

    answerList.forEach((optText, idx) => {
        const btn = document.createElement("button");
        btn.className = "answer-button";
        btn.type = "button";
        btn.innerText = optText;
        btn.dataset.index = idx;
        btn.disabled = false;

        btn.addEventListener("click", () => {
            if (submitted) return;

            if (selectedIndex === idx) {
                selectedIndex = null;
                btn.classList.remove("selected");
            } else {
                selectedIndex = idx;
                Array.from(option.children).forEach(c => c.classList.remove("selected"));
                btn.classList.add("selected");
            }
            nextButton.disabled = selectedIndex === null;
        });

        option.appendChild(btn);
    });

    selectedIndex = null;
    submitted = false;
    nextButton.disabled = true;
    nextButton.innerText = "Проверить";
    nextButton.style.display = "";
}

nextButton.addEventListener("click", () => {
    const q = questionNames[currentIndex];
    if (nextButton.disabled) return;

    if (!submitted) {
        const buttons = Array.from(option.children);
        const correctIdx = q.correct;
        if (selectedIndex === correctIdx) {
            buttons[selectedIndex].classList.add("correct");
            score++;
        } else {
            if (selectedIndex !== null) buttons[selectedIndex].classList.add("wrong");
            if (typeof correctIdx === "number" && buttons[correctIdx]) buttons[correctIdx].classList.add("correct");
        }

        buttons.forEach(b => b.disabled = true);
        submitted = true;

        if (currentIndex >= questionNames.length - 1) {
            nextButton.innerText = "Показать результат";
        } else {
            nextButton.innerText = "Дальше";
            nextButton.disabled = false;
        }
        return;
    }


    currentIndex++;
    if (currentIndex >= questionNames.length) {
        questionName.innerText = `Квиз завершён. Правильных ответов: ${score} из ${questionNames.length}`;
        option.innerHTML = "";
        option.style.display = "none";
        nextButton.style.display = "none";
        nextButton.disabled = true;
        return;
    }
    renderQuestion(currentIndex);
});


renderQuestion(0);
