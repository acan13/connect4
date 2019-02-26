<template>
  <div id="app">
    <h1>Connect 4</h1>
    <game-wrapper></game-wrapper>
  </div>
</template>
<script>
import GameWrapperVue from './components/Game/GameWrapper.vue'

export default {
  components: {
    'game-wrapper': GameWrapperVue
  }
}
</script>

<style>

</style>
