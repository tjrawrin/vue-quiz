<template>
  <div class="BottomBar">
    <button class="BottomBar-btn" :class="(selectedResponses.length === 0 ? 'BottomBar-btn--disabled' : '')" :disabled="selectedResponses.length === 0" v-if="currentCard === 'question-card'" @click="checkAnswer">Check Answer</button>
    <button class="BottomBar-btn" v-if="currentCard === 'feedback-card' && !lastQuestionIndex" @click="nextQuestion">Next Question</button>
    <button class="BottomBar-btn" v-if="currentCard === 'feedback-card' && lastQuestionIndex" @click="finishQuiz">Finish Quiz</button>
    <button class="BottomBar-btn" v-if="currentCard === 'score-card'" @click="resetQuiz">Reset Quiz</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'BottomBar',
  computed: {
    ...mapGetters(['lastQuestionIndex']),
    ...mapState(['currentCard', 'selectedResponses']),
  },
  methods: {
    ...mapActions(['checkAnswer', 'finishQuiz', 'nextQuestion', 'resetQuiz']),
  },
};
</script>

<style lang="scss">
.BottomBar {
  background-color: #e0e0e0;
  border: 1px solid transparentize(#000000, 0.62);
  border-radius: 4px;
  bottom: 2px;
  display: flex;
  justify-content: flex-end;
  left: 2px;
  padding: 4px;
  position: absolute;
  right: 2px;
  &-btn {
    background-color: #6ec6ff;
    border: 1px solid transparentize(#000000, 0.62);
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: 5px 12px;
    transition: all 0.25s ease;
    &:hover {
      background-color: #2196f3;
    }
    &--disabled {
      background-color: #eeeeee;
      cursor: default;
      &:hover {
        background-color: #eeeeee;
      }
    }
  }
}
</style>