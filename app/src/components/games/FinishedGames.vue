<template>
  <div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th class="has-text-weight-light">Opponent</th>
          <th class="has-text-weight-light">Finished</th>
          <th class="has-text-weight-light">Result</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.GameId">
          <td>
            {{ opponentName(game) }}
          </td>
          <td>
            {{ game.UpdateDate | since }}
          </td>
          <td>
            <span class="tag is-success is-rounded">WIN</span>
          </td>
          <td>
            <a class="button is-uppercase is-small is-light" v-on:click="navigateToGame(game.GameId)">View</a>
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
  name: 'tictactoe-completed-games',

  methods: {
    opponentName: function (game) {
      return game.HostId === this.username ? game.OpponentId : game.HostId
    },

    navigateToGame: function (gameId) {
      this.setCurrentGame(gameId)
    }
  }
}
</script>
