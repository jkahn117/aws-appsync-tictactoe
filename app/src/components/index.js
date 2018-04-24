import Vue from 'vue'

import Game from './Game'
import GameMenu from './GameMenu'
import NewGameModal from './NewGameModal'

Vue.component('game', Game)
Vue.component('game-menu', GameMenu)
Vue.component('new-game-modal', NewGameModal)

export * from './auth'
export {
  Game,
  GameMenu,
  NewGameModal
}
