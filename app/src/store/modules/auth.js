import * as types from '../mutation-types'

// ---- Initial State
const state = {
  user: null,
  userId: null,
  userVerification: []
}

// ---- Getters
const getters = {
  currentUser: state => state.user,
  currentUserId: state => state.userId,
  isLoggedIn: state => !!state.user
}

// ---- Actions
const actions = {
  login ({ commit }, currentUser) {
    commit(types.AUTH_SIGN_IN, currentUser)
  },

  setCurrentUserId ({ commit }, currentUserId) {
    commit(types.AUTH_USER_ID, currentUserId)
  },

  logout ({ commit }) {
    commit(types.AUTH_SIGN_OUT)
  }
}

// ---- Mutations
const mutations = {
  [types.AUTH_SIGN_IN] (state, user) {
    state.user = user
  },

  [types.AUTH_USER_ID] (state, userId) {
    state.userId = userId
  },

  [types.AUTH_SIGN_OUT] (state) {
    state.user = null
    state.userId = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
