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
    let gifPath = type === 'dice' ? 'images/AdobeStock_575314515.gif' : 'images/AdobeStock_332479969.gif';
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
    const diceQuestions = [
        {
            question: "What is the expected value of rolling two six-sided dice?", 
            answer: "7", 
            solution: "To find the expected value, add all possible outcomes (2 to 12) and divide by the number of outcomes (11)."
        },
        {
            question: "On average, how many times must a 6-sided die be rolled until a 6 turns up?",
            answer: "6",
            solution: "To find the average rolls for a fair 6-sided die to show a 6, we use the formula for expected value : E[X] = ∑_{n=1}^{∞} n ⋅ P(X = n). Given that each roll has a 1/6 chance of showing a 6, we substitute into the formula: E[X] = ∑_{n=1}^{∞} n ⋅ (1/6). This simplifies to: E[X] = (1/6) × (1 + 2 + 3 + 4 + 5 + ...). Using the formula for the sum of consecutive integers, we find: E[X] = 6. So, on average, it takes 6 rolls to get a 6."
        },
        {
            question: "On average, how many times must a 6-sided die be rolled until the sequence 65 appears (i.e., a 6 followed by a 5)",
            answer: "36",
            solution: "To find the average number of rolls until the sequence 65 appears on a fair 6-sided die, we'll define two variables: - E: Expected number of rolls until 65 appears. - E6: Expected number of rolls until 65 appears when starting with a rolled 6. We have the following equations:  1. E6 = (1/6)(E6 + 1) + (4/6)(E + 1) + (1/6)(1). 2. E = (1/6)(E6 + 1) + (5/6)(E + 1). Solving these equations gives us the solution. Let's simplify them: 1. E6 = (1/6)E6 + (4/6)E + (1/6)(1) + (4/6). Simplified: E6 = (1/6)E6 + (4/6)E + (5/6). 2. E = (1/6)(E6 + 1) + (5/6)E + (5/6). Simplified: E = (1/6)E6 + (1/6) + (5/6)E + (5/6). Now, let's solve for E and E6. From equation 1, we have: E6 = (4/5)E + 1. Substituting E6 into equation 2, we get: E = (1/6)((4/5)E + 1 + 1) + (5/6)E + (5/6). Solving this equation gives us the value of E. After solving, we find: E = 36. So, on average, it takes 36 rolls until the sequence 65 appears on a fair 6-sided die."
        },
        {
            question: "On average, how many times must a 6-sided die be rolled until all sides appear at least once?(write your answer as a decimal).",
            answer: "14.7",
            solution: "To calculate the average number of rolls needed to roll until every side of a fair 6-sided die appears, we use a step-wise approach:  1. We start by rolling once. 2. Then, we roll until a different side appears. On average, this takes (1 + 6/5) rolls. 3. Next, we roll until a side different from the two already rolled appears. This requires, on average, (1 + 6/4) rolls. 4. We continue this process, adding the reciprocals of the remaining sides to get the average rolls needed. The total average rolls needed can be calculated as follows: 1 + 6/5 + 6/4 + 6/3 + 6/2 + 6/1 = 147/10 = 14.7. So, on average, it takes 14.7 rolls until every side of the die appears."
        },
        {
            question: "A magician holds one six-sided die in his left hand and two in his right. What is the probability the number on the dice in his left hand is greater than the sum of the dice in his right? (Write your answer in the form of 0.0ab)",
            answer: "0.093",
            solution: "To find the probability that the number on the die in the magician's left hand is greater than the sum of the numbers on the dice in his right hand, we'll calculate the probabilities for each possible outcome. Given that the magician rolls two dice with outcomes ranging from 2 to 5 inclusive, the probabilities for each outcome are: '2' - 1/36, '3' - 2/36, '4' - 3/36, '5' - 4/36. For the die in the magician's left hand, the probabilities for rolling each number from 3 to 6 inclusive are all 1/6. We'll calculate the probability of winning for each possible outcome: - If the magician rolls '3' with one die, he can win only by rolling '2' with two dice: (1/6) * (1/36) = 1/216. - If he rolls '4', he can win by rolling '2' or '3' with two dice: (1/6) * (3/36) = 3/216. - If he rolls '5', he can win by rolling '2', '3', or '4' with two dice: (1/6) * (6/36) = 6/216. - If he rolls '6', he can win by rolling '2', '3', '4', or '5' with two dice: (1/6) * (10/216) = 10/216. Adding up all these probabilities gives us the total probability of winning: 1/216 + 3/216 + 6/216 + 10/216 = 20/216 = 5/54. So, the probability that the number on the die in the magician's left hand is greater than the sum of the numbers on the dice in his right hand is 5/54."
        }
    ];
    const cardQuestions = [
        {
            question: "What's the probability of getting a flush in a poker hand?", 
            answer: "0.00198079", 
            solution: "Calculate the probability by dividing the number of flush combinations (1,277) by the total number of poker hands (2,598,960)."
        }
    ];

    const questions = type === 'dice' ? diceQuestions : cardQuestions;
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
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
