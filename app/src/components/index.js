import Vue from 'vue'

import Game from './Game'
import InvitedGames from './InvitedGames'
import InProgressGames from './InProgressGames'
import CompletedGames from './CompletedGames'

Vue.component('game', Game)
Vue.component('invited-games', InvitedGames)
Vue.component('in-progress-games', InProgressGames)
Vue.component('completed-games', CompletedGames)

export * from './auth'
export {
  Game,
  InvitedGames,
  InProgressGames,
  CompletedGames
}
