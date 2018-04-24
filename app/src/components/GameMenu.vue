<template>
  <div>
    <p class="title is-3">My Games</p>

    <b-tabs v-model="activeTab" type="is-boxed">
      <b-tab-item>
        <template slot="header">
          <span>In Progress <b-tag rounded>{{ this.activeCount }}</b-tag></span>
        </template>
        <active-games v-bind:games="this.games.Active" />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>Invited <b-tag rounded>{{ this.inviteCount }}</b-tag></span>
        </template>
        <invited-games v-bind:games="this.games.Invited" />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>Finished <b-tag rounded>{{ this.finishedCount }}</b-tag></span>
        </template>
        <finished-games v-bind:games="this.games.Finished" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import * as Games from './games'
import { mapGetters } from 'vuex'
import { PlayerGamesQuery } from '@/api/queries'
import { OnGameInviteSubscription, OnGameUpdateSubscription } from '@/api/subscriptions'

Vue.component('active-games', Games.ActiveGames)
Vue.component('finished-games', Games.FinishedGames)
Vue.component('invited-games', Games.InvitedGames)

export default {
  name: 'tictactoe-game-menu',

  data () {
    return {
      games: {
        Invited: [],
        Active: [],
        Finished: []
      },
      activeTab: 0,
      subscriptions: {}
    }
  },

  watch: {
    games: {
      handler: function (val, oldVal) {
        for (let game of val.Active) {
          this.subscribeToGameUpdates(game.GameId)
        }
      },
      immediate: true
    }
  },

  computed: {
    ...mapGetters({
      'username': 'currentUsername'
    }),

    activeCount: function () {
      return this.games && this.games.Active ? this.games.Active.length : 0
    },

    inviteCount: function () {
      return this.games && this.games.Invited ? this.games.Invited.length : 0
    },

    finishedCount: function () {
      return this.games && this.games.Finished ? this.games.Finished.length : 0
    }
  },

  methods: {
    subscribeToGameUpdates: function (gameId) {
      // check if the game is active ... show warning if not
      if (this.subscriptions[gameId]) {
        this.subscriptions[gameId].unsubscribe()
      }

      this.$apollo.queries.games.subscribeToMore({
        document: OnGameUpdateSubscription,
        variables: {
          gameId: gameId
        },
        updateQuery: (previous, { subscriptionData }) => {
          let activeGames = Object.assign([], previous.playerGames.Active)
          let gameData = subscriptionData.data.onGameUpdate

          const index = activeGames.findIndex(g => g.GameId === gameData.GameId)
          if (index < 0) {
            previous.Active.push(gameData)
          } else {
            const updatedGame = Object.assign({}, activeGames[index], gameData)
            activeGames[index] = updatedGame
          }

          const newPlayerGames = {
            ...previous.playerGames,
            Active: activeGames
          }

          return {
            playerGames: newPlayerGames
          }
        } // end updateQuery
      })
    }
  },

  apollo: {
    games: {
      query: PlayerGamesQuery,
      variables () {
        return {
          playerId: this.username
        }
      },
      update: data => data.playerGames,
      subscribeToMore: {
        document: OnGameInviteSubscription,
        variables () {
          return {
            playerId: this.username
          }
        },
        updateQuery: (previous, { subscriptionData }) => {
          if (previous.playerGames.Invited.find(game => game.GameId === subscriptionData.data.onGameInvite.GameId)) {
            return previous
          }

          const newPlayerGames = {
            ...previous.playerGames,
            Invited: [
              subscriptionData.data.onGameInvite,
              ...previous.playerGames.Invited
            ]
          }

          return {
            playerGames: newPlayerGames
          }
        } // end updateQuery
      } // end subscription
    }
  }
}
</script>
