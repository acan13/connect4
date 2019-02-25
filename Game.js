class Game {
    constructor(firstMoveColor = "red") {
        let board = [];
        for (let i = 0; i < 7; i++) {
            let col = [];
            for (let j = 0; j < 6; j++) {
                col.push(null);
            }
            board.push(col);
        }
        this.board = board;

        this.currentTurnColor = firstMoveColor;
        this.gameStatus = "NotStarted";
        this.winner = null;
        this.moveHistory = {
            startingColor: firstMoveColor,
            moves: [],
        };
    }

    setPiece(color, colIndex) {
        let moveStatus = this._getMoveStatus(colIndex, color);
        if (!moveStatus.isValid) {
            console.log('invalid move: ', moveStatus.message);
            return;
        }
        this.gameStatus = "InPlay";
        this._dropPiece(color, colIndex);
        this._switchCurrentTurnColor();
        let winner = this._checkForGameWinner();
        if (winner) {
            this.winner = winner;
            this.gameStatus = "Finished";
        }
    }

    _getMoveStatus(colIndex, color) {
        if (this.gameStatus === "Finished") {
            return {
                isValid: false,
                message: `Game was already won by ${this.winner}`,
            };
        }
        if (color !== this.currentTurnColor) {
            return {
                isValid: false,
                message: `It is currently ${this.currentTurnColor}'s turn`,
            };
        }
        if (colIndex < 0 || colIndex > 6) {
            return {
                isValid: false,
                message: `Column must be a number from 0 to 6`,
            };
        }
        if (this.board[colIndex][5] !== null) {
            return {
                isValid: false,
                message: `Column ${colIndex} is already full`,
            };
        }
        return {
            isValid: true,
            message: '',
        };
    }

    _addMoveToHistory(colIndex) {
        this.moveHistory.moves.push(colIndex);
    }

    _dropPiece(color, colIndex, rowIndex = 5) {
        if (rowIndex >= 0 && this.board[colIndex][rowIndex - 1] === null) {
            this._dropPiece(color, colIndex, rowIndex - 1);
            return;
        }
        this.board[colIndex][rowIndex] = color;
        return;
    }

    _switchCurrentTurnColor() {
        if (this.currentTurnColor === 'red') {
            this.currentTurnColor = 'black';
            return;
        }
        this.currentTurnColor = 'red';
        return;
    }

    _checkForGameWinner() {
        for (let colIndex = 0; colIndex < 7; colIndex++) {
            for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
                const checkDirections = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
                for (const checkDirection of checkDirections) {
                    let winningColor = this._checkDirection(colIndex, rowIndex, checkDirection[0], checkDirection[1]);
                    if (winningColor) {
                        return winningColor;
                    }
                }
            }
        }
        return null;
    }

    _checkDirection(colIndex, rowIndex, colDirection, rowDirection, length = 1) {
        let color = this.board[colIndex][rowIndex];
        if (color === null) {
            return null;
        }
        let nextCol = colIndex + colDirection;
        let nextColInBoard = nextCol >= 0 && nextCol < 7;
        let nextRow = rowIndex + rowDirection;
        let nextRowInBoard = nextRow >= 0 && nextRow < 6;
        if (nextColInBoard && nextRowInBoard && this.board[nextCol][nextRow] === color) {
            length++;
            if (length === 4) {
                return color;
            }
            return this._checkDirection(nextCol, nextRow, colDirection, rowDirection, length);
        }
        return null;
    }
}