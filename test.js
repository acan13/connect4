let testGame = new Game();
let testAI = new SimpleAI('red');

let firstMove = testAI.getNextMove(testGame.board);
console.log('firstMove', firstMove);
testGame.setPiece(testAI.color, firstMove);
console.log(testGame);