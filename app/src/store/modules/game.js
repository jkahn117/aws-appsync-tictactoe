import * as types from '../mutation-types'

// ---- Initial State
const state = {
  gameId: null,
  activeCount: 0,
  inviteCount: 0,
  completeCount: 0
}

// ---- Getters
const getters = {
  currentGameId: state => state.gameId,
  activeCount: state => state.activeCount,
  inviteCount: state => state.inviteCount,
  completeCount: state => state.completeCount
}

// ---- Actions
const actions = {
  setCurrentGame ({ commit }, gameId) {
    commit(types.GAME_CHANGE, gameId)
  },

  setInvitedGameCount ({commit}, count) {
    commit(types.GAME_INVITE_LOADED, count)
  },

  setActiveGameCount ({commit}, count) {
    commit(types.GAME_ACTIVE_LOADED, count)
  },

  setCompleteGameCount ({commit}, count) {
    commit(types.GAME_COMPLETE_LOADED, count)
  }
}

// ---- Mutations
const mutations = {
  [types.GAME_CHANGE] (state, gameId) {
    state.gameId = gameId
  },

  [types.GAME_INVITE_LOADED] (state, count) {
    state.inviteCount = count
  },

  [types.GAME_ACTIVE_LOADED] (state, count) {
    state.activeCount = count
  },

  [types.GAME_COMPLETE_LOADED] (state, count) {
    state.completeCount = count
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
