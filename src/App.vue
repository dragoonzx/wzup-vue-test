<template>
  <div id="app">
    <MainView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MainView from '@/views/MainView.vue'

@Component({
  components: {
    MainView
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main {
  &__btn {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }
}
</style>
