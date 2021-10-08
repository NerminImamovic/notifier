
import { createStore } from 'vuex'

export default createStore({
  state: {
    messages: [],
  },
  mutations: {
    addMessage(state, message) {
      state.messages.push(message);
    }
  },
  actions: {
    addMessage(context, message) {
      context.commit('addMessage', message);
    }
  }
});
