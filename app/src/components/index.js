import Vue from 'vue'

import Game from './Game'
import InvitedGames from './InvitedGames'
import InProgressGames from './InProgressGames'
import CompletedGames from './CompletedGames'
import NewGameModal from './NewGameModal'

Vue.component('game', Game)
Vue.component('invited-games', InvitedGames)
Vue.component('in-progress-games', InProgressGames)
Vue.component('completed-games', CompletedGames)
Vue.component('new-game-modal', NewGameModal)

export * from './auth'
export {
  Game,
  InvitedGames,
  InProgressGames,
  CompletedGames,
  NewGameModal
}
