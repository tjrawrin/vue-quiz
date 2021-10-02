<template>
  <div class="TopBar" :class="{ 'TopBar--correct': questionCorrect && currentCard === 'feedback-card', 'TopBar--incorrect': !questionCorrect && currentCard === 'feedback-card' }">
    <span v-if="(questionCorrect || !questionCorrect) && currentCard === 'feedback-card'" v-text="(questionCorrect ? 'Correct!' : '') || (!questionCorrect ? 'Incorrect!' : '')"></span>
    <span v-if="currentCard !== 'score-card'">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}.</span>
    <span v-if="currentCard === 'score-card'">Final Score</span>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'TopBar',
  computed: {
    ...mapState([
      'currentCard',
      'currentQuestionIndex',
      'questions',
      'questionCorrect',
    ]),
  },
})
export default class TopBar extends Vue {}
</script>

<style lang="scss">
.TopBar {
  background-color: #e0e0e0;
  border: 1px solid transparentize(#000000, 0.62);
  border-radius: 4px;
  display: flex;
  justify-content: flex-end;
  left: 2px;
  padding: 10px;
  position: absolute;
  right: 2px;
  top: 2px;
  &--correct {
    background-color: #81c784;
    justify-content: space-between;
  }
  &--incorrect {
    background-color: #e57373;
    justify-content: space-between;
  }
}
</style>
