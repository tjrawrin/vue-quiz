import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// initial state
const state = {
  currentCard: 'question-card',
  currentQuestionIndex: 0,
  points: 0,
  questions: window.questions,
  questionCorrect: false,
  selectedResponses: [],
};

// getters
const getters = {
  calculateFinalPercent: state => {
    return Math.floor(state.points / state.questions.length * 100);
  },
  lastQuestionIndex: state => {
    return state.currentQuestionIndex === state.questions.length - 1;
  },
};

// actions
const actions = {
  checkAnswer(context) {
    context.commit('CHECK_ANSWER');
    if (window.MathJax) {
      setTimeout(
        () => window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]),
        300,
      );
    }
  },
  finishQuiz(context) {
    context.commit('CLEAR_SELECTED_RESPONSES');
    context.commit('FINISH_QUIZ');
  },
  nextQuestion(context) {
    context.commit('CLEAR_SELECTED_RESPONSES');
    context.commit('NEXT_QUESTION');
    if (window.MathJax) {
      setTimeout(
        () => window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]),
        300,
      );
    }
  },
  resetQuiz(context) {
    context.commit('RESET_QUIZ');
    if (window.MathJax) {
      setTimeout(
        () => window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]),
        300,
      );
    }
  },
  updateSelectedResponses({ commit, state }, response) {
    if (state.questions[state.currentQuestionIndex].type !== 'MA') {
      commit('CLEAR_SELECTED_RESPONSES');
      commit('UPDATE_SELECTED_RESPONSES', response);
    } else {
      commit('UPDATE_SELECTED_RESPONSES', response);
    }
  },
};

// mutations
const mutations = {
  CHECK_ANSWER(state) {
    if (state.questions[state.currentQuestionIndex].type === 'MA') {
      const correctCount = state.questions[
        state.currentQuestionIndex
      ].responses.reduce((acc, response) => {
        return response.correct ? acc + 1 : acc;
      }, 0);
      const userCorrectCount = state.selectedResponses.reduce(
        (acc, response) => {
          return response.correct ? acc + 1 : acc * 0;
        },
        0,
      );
      if (userCorrectCount === correctCount) {
        state.questionCorrect = true;
        state.points = state.points + 1;
      } else {
        state.questionCorrect = false;
      }
    } else {
      if (state.selectedResponses[0].correct) {
        state.questionCorrect = true;
        state.points = state.points + 1;
      } else {
        state.questionCorrect = false;
      }
    }
    state.currentCard = 'feedback-card';
  },
  CLEAR_SELECTED_RESPONSES(state) {
    state.selectedResponses = [];
  },
  FINISH_QUIZ(state) {
    state.currentCard = 'score-card';
  },
  NEXT_QUESTION(state) {
    state.currentQuestionIndex = state.currentQuestionIndex + 1;
    state.currentCard = 'question-card';
  },
  RESET_QUIZ(state) {
    state.currentQuestionIndex = 0;
    state.points = 0;
    state.questionCorrect = false;
    state.currentCard = 'question-card';
  },
  UPDATE_SELECTED_RESPONSES(state, response) {
    if (state.selectedResponses.indexOf(response) !== -1) {
      state.selectedResponses = state.selectedResponses.filter(
        item => item !== response,
      );
    } else {
      state.selectedResponses.push(response);
    }
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
