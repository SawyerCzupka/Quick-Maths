const streakRequired = 5;
let questionNumber = 1;
let totalCorrect = 0;
let correctStreak = 0;
let incorrectStreak = 0;
let difficulty = 1;

var question = createQuestion();

export {question, answerClick, newQuestion};

function newQuestion() {
    question = createQuestion();
}

function createQuestion() { // Difficulty represents amount of digits in numbers
    var num1 = generateNumber()
    var num2 = generateNumber()

    var greater = (num1 > num2) ? num1 : num2
    var smaller = (num1 < num2) ? num1 : num2

    return {
        question: `${greater} - ${smaller}`,
        answer: greater - smaller,
        answerChoices: createChoices(greater - smaller),
        response: false,
        checked: false
    };
}

function check(question) {
    if (question.checked != false) {
        return;
    }

    else {
        question.checked = true;
    }

    if (question.response == question.answer) {
        console.log('Correct!');

        totalCorrect += 1;
        correctStreak += 1;
        incorrectStreak = 0;

        if (correctStreak >= streakRequired) {
            correctStreak = 0;
            difficulty += 1;
        }

        console.log(correctStreak, difficulty)
    }

    else {
        console.log('Incorrect!');

        correctStreak = (correctStreak > 0) ? correctStreak - 1 : 0;
        incorrectStreak += 1;

        if (incorrectStreak >= streakRequired && difficulty > 1) {
            difficulty -= 1;
        }
    }

    questionNumber += 1;
}

function answerClick(response) {
    question.response = response;
    check(question);
}

function generateNumber(min = 10 ** (difficulty - 1), max = 10 ** difficulty) {
    if (min < 0) {
        max -= min;
        min = 0;
    }

    return Math.floor(Math.random() * (max-min) + min);
}

function createChoices(correctAnswer) {
    var correctPosition = generateNumber(0, 3);
    var choices = [];

    var range = (10 ** difficulty) / 4;
    
    while (choices.length < 4) {
        var choice = generateNumber(correctAnswer - range, correctAnswer + range)

        if (choices.length == correctPosition) {
            choices.push(correctAnswer);
        }

        else if (choices.includes(choice) || choice == correctAnswer) {
            continue;
        }

        else {
            choices.push(choice);
        }
    }

    return choices;
}