<template>
  <div id="app" role="main">
    <TopBar/>
    <transition name="fade" mode="out-in">
      <component :is="currentCard"></component>
    </transition>
    <BottomBar/>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import BottomBar from './components/BottomBar.vue';
import FeedbackCard from './components/FeedbackCard.vue';
import QuestionCard from './components/QuestionCard.vue';
import ScoreCard from './components/ScoreCard.vue';
import TopBar from './components/TopBar.vue';

@Component({
  name: 'app',
  components: {
    BottomBar,
    FeedbackCard,
    QuestionCard,
    ScoreCard,
    TopBar,
  },
  computed: {
    ...mapState(['currentCard']),
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  min-height: 100%;
  overflow: hidden;
}
#app {
  color: transparentize(#000000, 0.13);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
