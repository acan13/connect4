<template>
    <div class="game-wrapper">
        <div class="game-status">
            Status: {{ gameStatus }}
        </div>
        <div class="game-winner" v-if="winner">
            Winner: {{ winner }}
        </div>
        <div class="button-wrapper">
            <button @click="resetGame">Reset Game</button>
        </div>
        <div class="play-field">
            <div class="piece-drop" v-if="!winner">
                <div class="drop-slot" v-for="slot of dropSlots" :style="{'background-color': slot}"></div>
            </div>
            <div class="board-wrapper">
                <div class="game-col" v-for="col of gameBoard">
                    <div class="board-square" v-for="square of col" :style="{'background-color': square}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Game from '../../services/Game'
import SimpleAI from '../../services/SimpleAI'

export default {
    components: {

    },
    data() {
        return {
            game: new Game(),
            dropSlots: [],
            ai: undefined,
        };
    },
    computed: {
        currentColor() {
            return this.game.currentTurnColor;
        },
        gameBoard() {
            return this.game.board;
        },
        gameStatus() {
            return this.game.gameStatus;
        },
        winner() {
            return this.game.winner;
        }
    },
    watch: {
        currentColor(currentColor, pastColor) {
            this.switchColor(currentColor, pastColor);
        },
    },
    methods: {
        resetGame() {
            this.game = new Game();
        },
        moveLeft() {
            this.dropSlots.push(this.dropSlots.shift());
        },
        moveRigth() {
            this.dropSlots.unshift(this.dropSlots.pop());
        },
        switchColor(currentColor, pastColor) {
            let index = this.dropSlots.indexOf(pastColor);
            this.$set(this.dropSlots, index, currentColor);
        },
        placePiece(index) {
            this.game.setPiece(this.currentColor, index);
        },
        getCurrentSlotIndex() {
            return this.dropSlots.indexOf(this.currentColor);
        },
        handleKeyup(e) {
            if (e.code === "ArrowRight") {
                this.moveRigth();
            }
            if (e.code === "ArrowLeft") {
                this.moveLeft();
            }
            if (e.code === "Enter") {
                this.placePiece(this.getCurrentSlotIndex());
                this.makeAIMove();
            }
        },
        makeAIMove() {
            if (!this.ai) {
                this.ai = new SimpleAI(this.game.currentTurnColor);
            }
            let moveIndex = this.ai.getNextMove(this.gameBoard);
            this.placePiece(moveIndex);
        },
    },
    created() {
        this.dropSlots = [this.currentColor, null, null, null, null, null, null];
        window.addEventListener('keyup', this.handleKeyup);
    },
    beforeDestroy() {
        window.removeEventListener('keyup', this.handleKeyup);
    }
}
</script>

<style>
    .piece-drop {
        width: 1000px;
        height: 125px;
        display: flex;
    }
    .drop-slot {
        content: "";
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }
    .board-wrapper {
        width: 1000px;
        display: flex;
    }
    .game-col {
        display: flex;
        flex-direction: column-reverse;
    }
    .board-square {
        width: 50px;
        content: "";
        height: 50px;
        border-radius: 50px;
    }
</style>

