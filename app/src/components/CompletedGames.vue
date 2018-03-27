<template>
  <div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th class="has-text-weight-light">Opponent</th>
          <th class="has-text-weight-light">Winner</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in finished.games" :key="game.GameId">
          <td>
            {{ opponentName(game) }}
          </td>
          <td>
            {{ game.UpdateDate | since }}
          </td>
          <td>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ListCompletedQuery } from '@/api/queries'
import moment from 'moment'

export default {
  name: 'tictactoe-completed-games',

  data () {
    return {
      finished: {}
    }
  },

  filters: {
    since: function (timestamp) {
      return moment(timestamp, 'X').fromNow()
    }
  },

  methods: {
    opponentName: function (game) {
      // TODO: update with actual player ID
      return game.HostId === 'josh' ? game.OpponentId : game.HostId
    }
  },

  apollo: {
    finished: {
      query: ListCompletedQuery,
      variables () {
        // TODO: update with actual player ID
        return {
          username: 'josh'
        }
      }
    }
  }
}
</script>
