import * as types from '../mutation-types'

// ---- Initial State
const state = {
  gameId: null
}

// ---- Getters
const getters = {
  currentGameId: state => state.gameId
}

// ---- Actions
const actions = {
  setCurrentGame ({ commit }, gameId) {
    commit(types.GAME_CHANGE, gameId)
  }
}

// ---- Mutations
const mutations = {
  [types.GAME_CHANGE] (state, gameId) {
    state.gameId = gameId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
