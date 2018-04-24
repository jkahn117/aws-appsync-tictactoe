<template>
  <div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th class="has-text-weight-light">Opponent</th>
          <th class="has-text-weight-light">Turn</th>
          <th class="has-text-weight-light">Last Play</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.GameId">
          <td>
            {{ opponentName(game) }}
          </td>
          <td>
            <span class="tag is-warning is-rounded" v-if="isMyTurn(game)">MY TURN</span>
            <span class="tag is-light is-rounded" v-else>Opponent</span>
          </td>
          <td>
            {{ game.UpdateDate | since }}
          </td>
          <td>
            <a class="button is-uppercase is-small is-primary"
                v-if="isMyTurn(game)"
                v-on:click="navigateToGame(game.GameId)">
              Play
            </a>
            <a class="button is-uppercase is-small is-light"
                v-else
                v-on:click="navigateToGame(game.GameId)">
              View
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BaseGames from './BaseGames'

export default {
  extends: BaseGames,
  name: 'tictactoe-active-games',

  data () {
    return {
      subscriptions: {}
    }
  },

  methods: {
    opponentName: function (game) {
      return game.HostId === this.username ? game.OpponentId : game.HostId
    },

    isMyTurn: function (game) {
      return game.Turn === this.username
    },

    navigateToGame: function (gameId) {
      this.setCurrentGame(gameId)
    }
  }
}
</script>
