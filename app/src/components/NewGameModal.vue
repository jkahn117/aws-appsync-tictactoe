<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">New Game</p>
      <!-- <button class="delete" aria-label="close"></button> -->
    </header>
    <section class="modal-card-body">
      <div class="notification is-danger" v-if="error">
        {{ this.error }}
      </div>

      <p class="subtitle is-5">Pick an opponent:</p>
      <table class="table is-striped is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Wins</th>
            <th>Ties</th>
            <th>Losses</th>
            <th>Last Played</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in players"
                v-if="player.Username !== username"
                :key="player.Id"
                :id="player.Id"
                :class="selectedPlayerId === player.Id ? 'is-selected' : ''">
            <td>
              <div class="control">
                <label class="radio">
                  <input type="radio" name="playerId" :value="player.Id" v-model="selectedPlayerId" />
                </label>
              </div>
            </td>
            <td>{{ player.Username }}</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>2 mins ago</td>
          </tr>
        </tbody>
      </table>

      <!-- <nav class="pagination is-small" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next page</a>
        <ul class="pagination-list">
          <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
          <li><span class="pagination-ellipsis">&hellip;</span></li>
        </ul>
      </nav> -->
    </section>
    <footer class="modal-card-foot">
      <button class="button is-info" v-on:click="startGame()">Start Game</button>
      <button class="button" v-on:click="$parent.close()">Cancel</button>
    </footer>
  </div>
</template>

<script>
import { AllPlayersQuery } from '@/api/queries'
import { CreateGameMutation } from '@/api/mutations'
import { mapGetters } from 'vuex'

export default {
  name: 'tictactoe-new-game-modal',

  data () {
    return {
      players: [],
      selectedPlayerId: 0,
      error: ''
    }
  },

  computed: {
    ...mapGetters({
      'username': 'currentUsername'
    })
  },

  methods: {
    startGame: function () {
      if (this.selectedPlayerId === 0) {
        return
      }

      let opponent = this.players.find(player => player.Id === this.selectedPlayerId)
      console.log(`Starting new game versus ${opponent.Username}`)

      this.$apollo.mutate({
        mutation: CreateGameMutation,
        variables: {
          opponentId: opponent.Username
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createGame: {
            __typename: 'Game',
            GameId: -1,
            HostId: this.username,
            OpponentId: opponent.Username,
            Turn: opponent.Username,
            OPlayer: this.username,
            StartDate: 'now',
            StatusDate: 'PENDING_now',
            Game: [ '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
          }
        }
      }).then(() => {
        this.$parent.close()
      }).catch(error => {
        console.error(error)
        this.error = error.message || error
      })
    }
  },

  apollo: {
    players: {
      query: AllPlayersQuery,
      update: data => data.allPlayers.players
    }
  }
}
</script>
