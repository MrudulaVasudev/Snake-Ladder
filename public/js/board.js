var canvas = document.getElementById('game-board-wrapper');
var ctx = canvas.getContext('2d');
var player1 = document.getElementById('player1');
var maxHeight = 800, maxWidth = 800, width = maxWidth/10, height = maxHeight/10;
var playerLToR = true, playerX = 0, playerY = maxHeight;
var previousX = 0, previousY = 0, cellNumber = 0;

$((document).ready = () => {
    ctx.fillRect(0, 0, 800, 800);
    drawBoard();
    
})

const drawBall = (xdim, ydim) => {
    previousX = xdim - 5;
    previousY = ydim - 5;
    var x = xdim, y = ydim;
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

var drawBoard = () => {
   leftToRight = true;
    for(var i = 0, x = 0; x < maxWidth ; x += width, i++) {
        for (let j = 0, y = 0 ; y < maxHeight ; y += height, j++){
            var num = (100 - ((i * 10) + j));
            ctx.font = "20pt sans-serif"
            if( j % 2 === 0)
                ctx.fillStyle = "pink";
            else 
                ctx.fillStyle = "white";
            if(leftToRight) {
                ctx.fillRect(y, x, width, height)
                ctx.fillStyle = 'black'
                ctx.fillText(num, y, (x + width))
            }
            else{
                ctx.fillRect(maxWidth - y - width, x, width, height)
                ctx.fillStyle = 'black'
                ctx.fillText(num, maxWidth - y - width, x + width)
            }
            
        }
        leftToRight = !leftToRight;
    }
    var ladder1 = document.getElementById('ladder-1');
    var ladder2 = document.getElementById('ladder-2');
    var snake1 = document.getElementById('snake-1');
    var snake2 = document.getElementById('snake-2');
    ctx.drawImage(ladder1, 100, 300, 50, 300)
    ctx.drawImage(ladder2, 500, 200, 400, 300)
    ctx.drawImage(ladder1, 500, 450, 50, 230)
    ctx.drawImage(snake1, 250, 40, 150, 200)
    ctx.drawImage(snake2, 170, 570, 130, 200)
    drawBall(40, maxHeight - 40)
}

const rollTheDice = () => {
    let numberOnTheDice, i = 0;
    $('.dice-button').prop('disabled', true)
    let timer = setInterval(() => {
        if(i < 10) {
            numberOnTheDice = Math.floor(Math.random() * 6) + 1;
            $('#number-on-the-dice').html(numberOnTheDice);
            i++;
        } else {
            clearInterval(timer);
            moveThePlayer(numberOnTheDice);
        }
    }, 100);
}

const clearRectangle = () => {
    ctx.clearRect(previousX, previousY, 10, 10)
    if (cellNumber != 0 && cellNumber % 2 === 0) {
        ctx.fillStyle = 'pink'
        ctx.fillRect(previousX, previousY, 10, 10)
    } else {
        ctx.fillStyle = 'white'
    }
}

const jumpToNumber = (num) => {
    clearRectangle();
    let firstDigit = Math.floor(num / 10);
    playerX = ( num % 10 ) * width;
    playerY = maxHeight - (firstDigit * height); // 23 = 23 / 10 = 2 * 80 = 160 :::: 800 - 160 = 640
    if (firstDigit % 2 === 0) {
        drawBall(playerX - 40, playerY - 40)
        playerLToR = true;
    } else {
        drawBall(maxWidth - playerX + 40, playerY - 40)
        playerLToR = false;
    }
    cellNumber = num;
}

const moveThePlayer = (num) => {
    playerX += (num * width);
    if (playerLToR) {
        clearRectangle()
        if(playerX <= maxWidth) {
            drawBall(playerX - 40, playerY - 40);
        } else {
            playerY -= 80;
            playerLToR = false;
            playerX = playerX - maxWidth;
            drawBall(maxWidth - playerX + 40, playerY - 40)
        }
        cellNumber += num;
    } else {
        if (playerX <= maxWidth) {
            clearRectangle()
            drawBall(maxWidth - playerX + 40, playerY - 40)
            cellNumber += num;
        } else if (playerX > maxWidth && cellNumber < 90) {
            clearRectangle()
            playerY -= 80;
            playerLToR = true;
            playerX = playerX - maxWidth;
            drawBall(playerX - 40, playerY - 40)
            cellNumber += num;
        }
        if (playerX > maxWidth && cellNumber+num > 100) {
            playerX -= (num*width)
        }
    }
    
    switch(cellNumber) {
        case 23: jumpToNumber(4);
                break;
        case 96: jumpToNumber(77);
                break;
        case 14: jumpToNumber(47);
                break;
        case 22: jumpToNumber(62);
                break;
        case 49: jumpToNumber(71);
                break;
    }
    if (cellNumber != 100) {
        $('.dice-button').prop('disabled', false)
    } else {
        alert("Congratulations! You won the game.")
    }
}
