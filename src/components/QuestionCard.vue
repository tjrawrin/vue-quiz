<template>
  <div class="QuestionCard">
    <p class="QuestionCard-text" v-html="renderMarkdown(questions[currentQuestionIndex].text)"></p>
    <ul class="QuestionCard-responses">
      <li class="QuestionCard-response" role="button" v-for="(response, index) in questions[currentQuestionIndex].responses" :key="index">
        <label class="QuestionCard-label" :for="index">
          <input class="QuestionCard-input" :id="index" name="response" :type="(questions[currentQuestionIndex].type === 'MA' ? 'checkbox' : 'radio')" @change="updateSelectedResponses(response)">
          <span class="QuestionCard-lettering">{{ String.fromCharCode('A'.charCodeAt(0) + index) }})</span>
          <span v-html="renderMarkdown(response.text)"></span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import marked from 'marked';

export default {
  name: 'question-card',
  computed: {
    ...mapState(['currentQuestionIndex', 'questions']),
  },
  methods: {
    ...mapActions(['updateSelectedResponses']),
    renderMarkdown(text) {
      return marked.inlineLexer(text, []);
    },
  },
};
</script>

<style lang="scss" scoped>
.QuestionCard {
  background-color: #f5f5f5;
  border: 1px solid transparentize(#000000, 0.62);
  border-radius: 4px;
  bottom: 54px;
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

  &-responses {
    margin: 0;
    padding: 0;
  }

  &-response {
    list-style-type: none;
    margin: 8px 0;
  }

  &-label {
    align-items: center;
    border: 1px solid transparentize(#000000, 0.62);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    margin: 0;
    padding: 8px;
    transition: all 0.25s ease;
  }

  &-input {
    height: 16px;
    margin-right: 8px;
    width: 16px;
  }

  &-lettering {
    margin-right: 8px;
    user-select: none;
  }
}
</style>
