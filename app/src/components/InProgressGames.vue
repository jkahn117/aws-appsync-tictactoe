<template>
  <div>
    <p class="is-uppercase has-text-weight-light">In Progress</p>

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
// import { OnInvitedSubscription } from '@/api/subscriptions'
import Store from '@/store'
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

  methods: {
    opponentName: function (game) {
      return game.HostId === 'josh' ? game.OpponentId : game.HostId
    },

    isMyTurn: function (game) {
      return game.Turn === 'josh'
    },

    navigateToGame: function (gameId) {
      Store.dispatch('setCurrentGame', gameId)
    }
  },

  apollo: {
    games: {
      query: ListInProgressQuery,
      variables () {
        // TODO: update with actual player ID
        return {
          username: 'josh'
        }
      },
      update: data => data.inProgress.games
      // subscribeToMore: {
      //   document: OnInvitedSubscription,
      //   variables: {
      //     username: 'josh'
      //   },
      //   updateQuery: (prev, { subscriptionData }) => {
      //     let newData = subscriptionData.data.onInvited
      //     newData.New = true

      //     console.log(newData)

      //     return {
      //       invites: {
      //         __typename: 'GameConnection',
      //         nextToken: prev.nextToken || '',
      //         games: [
      //           newData,
      //           ...prev.invites.games
      //         ]
      //       }
      //     } // end return
      //   }
      // }
    }
  }
}
</script>
