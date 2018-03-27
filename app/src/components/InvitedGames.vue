<template>
  <div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th class="has-text-weight-light">Opponent</th>
          <th class="has-text-weight-light">Invited</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in invites.games" :key="game.GameId">
          <td>
            {{ game.HostId }}
            <span class="tag is-warning is-rounded" v-if="game.New">NEW</span>
          </td>
          <td>
            {{ game.StartDate | since }}
          </td>
          <td>
            <a class="button is-uppercase is-small is-primary">Play</a>
            <a class="button is-small is-light">Decline</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ListInvitesQuery } from '@/api/queries'
import { OnInvitedSubscription } from '@/api/subscriptions'
import moment from 'moment'

export default {
  name: 'tictactoe-invited-games',

  data () {
    return {
      invites: {},
      subscriber: null
    }
  },

  filters: {
    since: function (timestamp) {
      return moment(timestamp, 'X').fromNow()
    }
  },

  apollo: {
    invites: {
      query: ListInvitesQuery,
      variables () {
        // TODO: update with actual player ID
        return {
          username: 'josh'
        }
      },
      subscribeToMore: {
        document: OnInvitedSubscription,
        variables: {
          username: 'josh'
        },
        updateQuery: (prev, { subscriptionData }) => {
          let newData = subscriptionData.data.onInvited
          newData.New = true

          return {
            invites: {
              __typename: 'GameConnection',
              nextToken: prev.nextToken || '',
              games: [
                newData,
                ...prev.invites.games
              ]
            }
          } // end return
        }
      }
    }
  }
}
</script>
