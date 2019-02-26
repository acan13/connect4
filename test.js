let Game = require('./Game');
let SimpleAI = require('./SimpleAI');

let testGame = new Game();
let redAI = new SimpleAI('red');
let blackAI = new SimpleAI('black');

let currentAI = redAI;

let block = 0;
while (testGame.gameStatus !== 'Finished' && block !== 50) {
    console.log('status', testGame.gameStatus)
    testGame.setPiece(currentAI.color, currentAI.getNextMove(testGame.board));
    currentAI === redAI ? currentAI = blackAI : currentAI = redAI;
    block++;
}

console.log('game over', testGame);