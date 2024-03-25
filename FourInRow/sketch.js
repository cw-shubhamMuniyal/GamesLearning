let rows = 7;
let cols = 6;
let w;
let dw = 80, mousePosition;
let players = { 0: "Blue", 1: "Red" };
let currentPlayer = 0;
let win = 4, gameMode, board = [];

function initBoard() {
    board = [
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1]
    ];
}

function preload() {
    bouncingBallSound = loadSound("https://cw-shubhammuniyal.github.io/GamesLearning/FourInRow/output.mp3");
    winningSound = loadSound("https://cw-shubhammuniyal.github.io/GamesLearning/FourInRow/drumRoll.wav");
}

function setup() {
    title = createP('Four in a Row');
    title.position(0, 0);
    title.size(300);
    initBoard();
    gameMode = null;

    // sel = createSelect();
    // sel.position(0, 120);
    // sel.option('human vs Human', 'hvh');
    // sel.option('human vs AI', 'hva');
    // sel.changed(mySelectEvent);

    let cnv = createCanvas(700, 700);
    cnv.position(330, 130);
    w = width / 7;
}

function mySelectEvent() {
    gameMode = sel.value();
}

function mousePressed() {
    if (win == 0 || win == 1 || win == 2) {
        win = 4;
        clear();
        setup();
        return;
    }
    let mousePlaced = mousePosition;
    console.log(mousePlaced);
    if (board[mousePlaced][0] == -1) {
        board[mousePlaced][0] = currentPlayer;
        let i = 0;
        while (true) {
            if (board[mousePlaced][i + 1] != -1) {
                checkWinner((i), mousePlaced);
                bouncingBallSound.play();
                console.log("jhgh" + (i) + "JKJ" + mousePlaced);
                break;
            }
            else {
                board[mousePlaced][i + 1] = board[mousePlaced][i];
                board[mousePlaced][i] = -1;
            }
            i++;
        }
        currentPlayer = (currentPlayer + 1) % 2;
    }
    else {
        let noPlace = 0;
        for (let i = 0; i < rows; i++) {
            if (board[i][0] == -1) {
                noPlace = 1;
                break;
            }
        }
        // Tie game
        if (noPlace == 0) {
            win = 2;
        }
    }
}

// i- row, j- cloumn
function checkWinner(i, j) {
    let piece = board[j][i], count = 0;

    // for horizontal
    let l = i;
    let m = j + 1;
    while (m < 7 && piece == board[m][i] && count < 3) {
        count++;
        m++;
    }
    m = j - 1;
    while (m >= 0 && piece == board[m][i] && count < 3) {
        count++;
        m--;
    }
    if (count == 3) {
        win = currentPlayer;
        return;
    }

    // for vertical
    count = 0;
    l = i + 1;
    m = j;

    while (l < 6 && piece == board[j][l] && count < 3) {
        count++;
        l++;
    }
    if (count == 3) {
        win = currentPlayer;
        return;
    }

    // Diagonal- right-top and bottom-left
    l = i - 1;
    m = j + 1;
    count = 0;
    while (l >= 0 && m < 7 && piece == board[m][l] && count < 3) {
        count++;
        l--;
        m++;
    }
    l = i + 1;
    m = j - 1;
    while (l < 6 && m >= 0 && piece == board[m][l] && count < 3) {
        count++;
        l++;
        m--;
    }
    if (count == 3) {
        win = currentPlayer;
        return;
    }

    // Diagonal- left-top and bottom-right     
    l = i - 1;
    m = j - 1;
    count = 0;
    while (l >= 0 && m >= 0 && piece == board[m][l] && count < 3) {
        count++;
        l--;
        m--;
    }

    l = i + 1;
    m = j + 1;
    while (l < 6 && m < 7 && piece == board[m][l] && count < 3) {
        count++;
        l++;
        m++;
    }
    if (count == 3) {
        win = currentPlayer;
        return;
    }
}

function draw() {
    background("yellow");
    fill(255);
    stroke(0);
    rect(-1, -1, width + 2, w);
    mousePosition = floor(mouseX / w);

    for (let i = 0; i < rows; i++) {
        for (let j = cols - 1; j >= 0; j--) {
            if (board[i][j] == 0) {
                fill(0, 0, 255);
            }
            else if (board[i][j] == 1) {
                fill(255, 0, 0);
            }
            else {
                fill(255, 255, 255);
            }
            ellipse(i * w + w / 2, (j + 1) * w + w / 2, dw);
        }
    }

    for (let x = w; x < width; x = x + w) {
        line(x, w, x, height);
    }
    if (currentPlayer == 0) {
        fill(0, 0, 255);
    }
    else {
        fill(255, 0, 0);
    }
    ellipse((mousePosition * w) + w / 2, w / 2, dw);
    let resultText = "";
    if (win != 4) {
        fill(255);
        rect(-1, -1, width + 2, w);
        textAlign(CENTER, CENTER);
        textSize(64);
        if (win == 0) {
            console.log("winner is" + players[0]);
            fill(0, 0, 255);
            resultText = `winner is ${players[0]}`;
        }
        else if (win == 1) {
            fill(255, 0, 0);
            console.log("winner is" + players[1]);
            resultText = `winner is ${players[1]}`;
        }
        else if (win == 2) {
            console.log("tie");
            fill(255, 250, 205);
            resultText = `It is a tie`;
        }
        winningSound.play();
        background(220);
        textSize(24);
        textAlign(CENTER);
        text(resultText, width / 2, height / 2);
        text("Click anywhere for a new game", width / 2, height / 2 + 30);
    }
}
