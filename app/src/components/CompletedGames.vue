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
            <a class="button is-uppercase is-small is-light">View</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ListCompletedQuery } from '@/api/queries'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'tictactoe-completed-games',

  data () {
    return {
      games: []
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

    completeCount: function () {
      return this.games.length
    }
  },

  watch: {
    completeCount: function (val) {
      this.setCompleteGameCount(val)
    }
  },

  methods: {
    ...mapActions([
      'setCompleteGameCount'
    ]),

    opponentName: function (game) {
      return game.HostId === this.username ? game.OpponentId : game.HostId
    }
  },

  apollo: {
    games: {
      query: ListCompletedQuery,
      variables () {
        return {
          username: this.username
        }
      },
      update: data => data.finished.games
    }
  }
}
</script>
