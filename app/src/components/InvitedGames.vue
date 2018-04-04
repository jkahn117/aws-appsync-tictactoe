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
        <tr v-for="game in games" :key="game.GameId">
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
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'tictactoe-invited-games',

  data () {
    return {
      games: [],
      subscriber: null
    }
  },

  computed: {
    ...mapGetters({
      'username': 'currentUsername'
    }),

    inviteCount: function () {
      return this.games.length
    }
  },

  watch: {
    inviteCount: function (val) {
      this.setInvitedGameCount(val)
    }
  },

  filters: {
    since: function (timestamp) {
      return moment(timestamp, 'X').fromNow()
    }
  },

  methods: {
    ...mapActions([
      'setInvitedGameCount'
    ])
  },

  apollo: {
    games: {
      query: ListInvitesQuery,
      variables () {
        return {
          username: this.username
        }
      },
      update: data => data.invites.games,
      subscribeToMore: {
        document: OnInvitedSubscription,
        variables () {
          return {
            username: this.username
          }
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
