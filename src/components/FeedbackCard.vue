<template>
  <div class="FeedbackCard">
    <p class="FeedbackCard-text" v-if="questionCorrect" v-html="renderMarkdown(questions[currentQuestionIndex].feedbackCorrect)"></p>
    <p class="FeedbackCard-text" v-if="!questionCorrect" v-html="renderMarkdown(questions[currentQuestionIndex].feedbackIncorrect)"></p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import marked from 'marked';

export default {
  name: 'feedback-card',
  computed: {
    ...mapState(['currentQuestionIndex', 'questions', 'questionCorrect']),
  },
  methods: {
    renderMarkdown(text) {
      return marked.inlineLexer(text, []);
    },
  },
};
</script>

<style lang="scss">
.FeedbackCard {
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid transparentize(#000000, 0.62);
  border-radius: 4px;
  bottom: 54px;
  display: flex;
  justify-content: center;
  left: 2px;
  overflow-y: auto;
  padding: 10px;
  position: absolute;
  right: 2px;
  top: 54px;
  &-text {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
