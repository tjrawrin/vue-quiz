import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
