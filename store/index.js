import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    isAuth: false,
    messages: [],
    users: [],
    currentUser: null
  },
  mutations: {
    login: state => state.isAuth = true,
    logout: state => state.isAuth = false,
    getMessages: (state, payload) => state.messages = payload,
    getUsers: (state, payload) => state.users = payload,
    updateCountMessages: (state, payload) => state.users.map(item => {
      console.log(item);
      if (payload === item.id) {
        item.countMessages = item.countMessages + 1;
        return item;
      }
      return item;
    })
  },
  actions: {
    async getMessages({commit}) {
      const url = window.location.host;
      const response = await axios.get(`http://${url.replace('8000', '3000')}/messages`);
      commit('getMessages', response.data);
    },
    async getUsers({commit}) {
      const url = window.location.host;
      const response = await axios.get(`http://${url.replace('8000', '3000')}/users`);
      commit('getUsers', response.data);
    }
  },
})

export default store
