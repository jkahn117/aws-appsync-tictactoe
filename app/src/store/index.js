import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  },

  state: {
    isHydrated: false,
    gameId: null
  },

  getters: {
    isHydrated: state => state.isHydrated,
    currentGameId: state => state.gameId
  },

  actions: {
    setCurrentGame ({ commit }, gameId) {
      commit(types.GAME_CHANGE, gameId)
    }
  },

  mutations: {
    APPSYNC_HYDRATED (state) {
      state.isHydrated = true
    },

    [types.GAME_CHANGE] (state, gameId) {
      state.gameId = gameId
    }
  }
})
