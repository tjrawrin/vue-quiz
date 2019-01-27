import Vue from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex';

Vue.use(Vuex);

// initial state
interface RootState {
  currentCard: string;
  currentQuestionIndex: number;
  points: number;
  questions: Array<{
    type: string;
    text: string;
    responses: Array<{
      correct: boolean;
      text: string;
    }>;
    feedbackCorrect: string;
    feedbackIncorrect: string;
  }>;
  questionCorrect: boolean;
  selectedResponses: Array<{
    correct: boolean;
    text: string;
  }>;
}
const state: RootState = {
  currentCard: 'question-card',
  currentQuestionIndex: 0,
  points: 0,
  questions: (window as any).questions,
  questionCorrect: false,
  selectedResponses: [],
};

// getters
const getters: GetterTree<RootState, RootState> = {
  // tslint:disable-next-line:no-shadowed-variable
  calculateFinalPercent: (state) => {
    return Math.floor((state.points / state.questions.length) * 100);
  },
  // tslint:disable-next-line:no-shadowed-variable
  lastQuestionIndex: (state) => {
    return state.currentQuestionIndex === state.questions.length - 1;
  },
};

// actions
const actions: ActionTree<RootState, RootState> = {
  checkAnswer(context) {
    context.commit('CHECK_ANSWER');
    if ((window as any).MathJax) {
      setTimeout(
        () => (window as any).MathJax.Hub.Queue(['Typeset', (window as any).MathJax.Hub]),
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
    if ((window as any).MathJax) {
      setTimeout(
        () => (window as any).MathJax.Hub.Queue(['Typeset', (window as any).MathJax.Hub]),
        300,
      );
    }
  },
  resetQuiz(context) {
    context.commit('RESET_QUIZ');
    if ((window as any).MathJax) {
      setTimeout(
        () => (window as any).MathJax.Hub.Queue(['Typeset', (window as any).MathJax.Hub]),
        300,
      );
    }
  },
  // tslint:disable-next-line:no-shadowed-variable
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
const mutations: MutationTree<RootState> = {
  // tslint:disable-next-line:no-shadowed-variable
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
  // tslint:disable-next-line:no-shadowed-variable
  CLEAR_SELECTED_RESPONSES(state) {
    state.selectedResponses = [];
  },
  // tslint:disable-next-line:no-shadowed-variable
  FINISH_QUIZ(state) {
    state.currentCard = 'score-card';
  },
  // tslint:disable-next-line:no-shadowed-variable
  NEXT_QUESTION(state) {
    state.currentQuestionIndex = state.currentQuestionIndex + 1;
    state.currentCard = 'question-card';
  },
  // tslint:disable-next-line:no-shadowed-variable
  RESET_QUIZ(state) {
    state.currentQuestionIndex = 0;
    state.points = 0;
    state.questionCorrect = false;
    state.currentCard = 'question-card';
  },
  // tslint:disable-next-line:no-shadowed-variable
  UPDATE_SELECTED_RESPONSES(state, response) {
    if (state.selectedResponses.indexOf(response) !== -1) {
      state.selectedResponses = state.selectedResponses.filter(
        (item) => item !== response,
      );
    } else {
      state.selectedResponses.push(response);
    }
  },
};

export default new Vuex.Store<RootState>({
  state,
  getters,
  actions,
  mutations,
});
