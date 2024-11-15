let direction = { x: 0, y: 0 };
let LastPaint = 0;
let speed = 15;

let snakeArr = [{ x: 13, y: 12 }];
let food = { x: 2, y: 5 };
let board = document.getElementById("board");

let score = 0;
let localHigh = localStorage.getItem("highscore");
let HighScore = localHigh ? parseInt(localHigh) : 0;

let ScoreSpan = document.getElementById("score");
let ScoreSpan2 = document.getElementById("hscore");

function main() {
    window.requestAnimationFrame(main);
    if ((performance.now() - LastPaint) / 1000 < 1 / speed) {
        return;
    }
    LastPaint = performance.now();
    game();
}

function checkCollision() {
    // Collision with body or out of bounds
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    if (snakeArr[0].x < 1 || snakeArr[0].y < 1 || snakeArr[0].x > 15 || snakeArr[0].y > 15) {
        return true;
    }
    return false;
}

function game() {
    if (checkCollision()) {
        alert("You lost");
        food = { x: 2, y: 5 };
        direction = { x: 0, y: 0 };
        snakeArr = [{ x: 13, y: 12 }];
        if (score > HighScore) {
            localStorage.setItem("highscore", score);
        }
        score = 0;
    }

    // Move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { x: snakeArr[i].x, y: snakeArr[i].y };
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // Check for food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        food.x = 2 + Math.floor(Math.random() * 12);
        food.y = 2 + Math.floor(Math.random() * 12);
        snakeArr.unshift({
            x: snakeArr[0].x + direction.x,
            y: snakeArr[0].y + direction.y,
        });
        score++;
        if (score > HighScore) {
            HighScore = score;
            localStorage.setItem("highscore", score);
        }
    }

    ScoreSpan.textContent = score;
    ScoreSpan2.textContent = HighScore;
    board.innerHTML = "";

    // Create food element
    let foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    board.appendChild(foodElement);

    // Create snake elements
    snakeArr.forEach((item, index) => {
        let element = document.createElement("div");
        element.classList.add("snake");
        element.style.gridRowStart = item.y;
        element.style.gridColumnStart = item.x;
        if (index === 0) {
            element.classList.add("head");
        }
        board.appendChild(element);
    });
}

document.body.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction.y !== 1) {
        direction = { x: 0, y: -1 };
    }
    if (e.key === "ArrowDown" && direction.y !== -1) {
        direction = { x: 0, y: 1 };
    }
    if (e.key === "ArrowLeft" && direction.x !== 1) {
        direction = { y: 0, x: -1 };
    }
    if (e.key === "ArrowRight" && direction.x !== -1) {
        direction = { y: 0, x: 1 };
    }
});

window.requestAnimationFrame(main);
