let gameArea;  // Declare gameArea globally

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    gameArea = document.getElementById('game-area');  // Initialize gameArea here
    console.log("gameArea found:", gameArea);

    const diceGameButton = document.getElementById('dice-game');
    const cardGameButton = document.getElementById('card-game');

    console.log("diceGameButton found:", diceGameButton);
    console.log("cardGameButton found:", cardGameButton);

    diceGameButton.addEventListener('click', function() {
        console.log("Dice game button clicked");
        playGame('dice');
    });

    cardGameButton.addEventListener('click', function() {
        console.log("Card game button clicked");
        playGame('cards');
    });
});


function playGame(type) {
    let gifPath = type === 'dice' ? 'dice.gif' : 'card.gif';
    gameArea.innerHTML = `<div id="game-animation"><img src="${gifPath}" alt="animation"></div>`;

    setTimeout(() => {
        let questionData = getQuestion(type);
        gameArea.innerHTML = `
            <div id="question-box">
                <h1>${type.charAt(0).toUpperCase() + type.slice(1)} Game</h1>
                <p>${questionData.question}</p>
                <input type="text" id="answer" placeholder="Enter your answer">
                <button id="submit-btn" onclick="checkAnswer('${questionData.answer}', '${questionData.solution}', '${type}')">Submit</button>
            </div>`;
    }, 3000);
}

function getQuestion(type) {
    const diceQuestions = {
        question: "What is the expected value of rolling two six-sided dice?", 
        answer: "7", 
        solution: "To find the expected value, add all possible outcomes (2 to 12) and divide by the number of outcomes (11)." 
    };
    const cardQuestions = {
        question: "What's the probability of getting a flush in a poker hand?", 
        answer: "0.00198079", 
        solution: "Calculate the probability by dividing the number of flush combinations (1,277) by the total number of poker hands (2,598,960)." 
    };
    return type === 'dice' ? diceQuestions : cardQuestions;
}

function checkAnswer(correctAnswer, solution, type) {
    let userAnswer = document.getElementById('answer').value;
    if (userAnswer === correctAnswer) {
        alert('Correct!');
        setTimeout(() => playGame(type), 2000);
    } else {
        alert('Wrong! ' + solution);
        gameArea.innerHTML += `<button onclick="playGame('${type}')">Play Again</button>`;
    }
}
