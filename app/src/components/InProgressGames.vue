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
            <a class="button is-uppercase is-small is-primary" :disabled="!isMyTurn(game)" v-on:click="navigateToGame(game.GameId)">Play</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ListInProgressQuery } from '@/api/queries'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'tictactoe-inprogress-games',

  data () {
    return {
      games: [],
      subscriber: null
    }
  },

  filters: {
    since: function (timestamp) {
      return moment(timestamp, 'X').fromNow()
    }
  },

  computed: {
    ...mapGetters({
      'username': 'currentUsername'
    }),

    activeCount: function () {
      return this.games.length
    }
  },

  watch: {
    activeCount: function (val) {
      this.setActiveGameCount(val)
    }
  },

  methods: {
    ...mapActions([
      'setCurrentGame',
      'setActiveGameCount'
    ]),

    opponentName: function (game) {
      return game.HostId === this.username ? game.OpponentId : game.HostId
    },

    isMyTurn: function (game) {
      return game.Turn === this.username
    },

    navigateToGame: function (gameId) {
      this.setCurrentGame(gameId)
    }
  },

  apollo: {
    games: {
      query: ListInProgressQuery,
      variables () {
        return {
          username: this.username
        }
      },
      update: data => data.inProgress.games
    }
  }
}
</script>
