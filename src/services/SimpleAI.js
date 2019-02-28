 export default class SimpleAI {
    constructor(color) {
        this.color = color;
    }

    getNextMove(board) {
        let potentialMoves = {
            offensive: {
                0: {},
                1: {},
                2: {},
                3: {},
            },
            defensive: {
                0: {},
                1: {},
                2: {},
                3: {},
            },
        };
        // console.log('start', JSON.parse(JSON.stringify(potentialMoves)));
        
        for (let colIndex = 0; colIndex < 7; colIndex++) {
            let row = 6;
            while (row > 0 && board[colIndex][row - 1] === null) {
                row--;
            }
            if (row !== 6) {
                const checkDirections = [[1,0],[1,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
                for (const checkDirection of checkDirections) {
                    let colorLengthInDirection = this._getColorLengthInDirection(board, colIndex, row, checkDirection[0], checkDirection[1], this.color);
                    let count = colorLengthInDirection.count;
                    let color = colorLengthInDirection.color;
                    let moveType = this.color === color ? 'offensive' : 'defensive';
                    potentialMoves[moveType][count][colIndex] = true;
                }
            }
        }
        
        // console.log('end', JSON.parse(JSON.stringify(potentialMoves)));
        for (let i = 3; i >= 0; i--) {
            if (Object.keys(potentialMoves.offensive[i]).length) {
                return this._getRandomValueFromArray(Object.keys(potentialMoves.offensive[i]));
            }            
            if (Object.keys(potentialMoves.defensive[i]).length) {
                return this._getRandomValueFromArray(Object.keys(potentialMoves.defensive[i]));
            }            
        }
    }
    
    _getRandomValueFromArray(array) {
        let index = Math.floor(Math.random()*array.length);
        return array[index];
    }

    _getColorLengthInDirection(board, colIndex, rowIndex, colDirection, rowDirection, moveColor) {
        let nextCol = colIndex + colDirection;
        let nextRow = rowIndex + rowDirection;
        let color;
        if (nextCol >= 0 && nextCol < 7 && nextRow >= 0 && nextRow < 6 && board[nextCol][nextRow] !== null) {
            color = board[nextCol][nextRow];
        }
        let count = 0;
        while (nextCol >= 0 && nextCol < 7 && nextRow >= 0 && nextRow < 6 && board[nextCol][nextRow] === color && count !== 3) {
            count++;
            nextCol += colDirection;
            nextRow += rowDirection;
        }
        return {
            count: count,
            color: color || moveColor,
        };
    }
}