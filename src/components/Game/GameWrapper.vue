<template>
    <game-state>
        <div class="game-wrapper">
            <div class="button-wrapper">
                <button @click="resetGame">Reset Game</button>
            </div>
            <div class="play-field">
                <div class="piece-drop">
                    <piece-dropper></piece-dropper>
                </div>
                <div class="board-wrapper">
                    <game-board></game-board>
                </div>
            </div>
        </div>
    </game-state>
</template>

<script>
import PieceDropperVue from './PieceDropper.vue'
import GameStateRenderlessVue from './GameStateRenderless.vue'
import GameBoardVue from './GameBoard.vue'


export default {
    components: {
        'piece-dropper': PieceDropperVue,
        'game-state': GameStateRenderlessVue,
        'game-board': GameBoardVue,
    }
}
</script>
