<template>
  <div>
    <p class="title is-3">
      My Game
      <span v-if="this.gameDetails.hasOwnProperty('Game')">vs {{ this.opponentName }}</span>
    </p>

    <!-- <div v-if="$apollo.loading">Loading...</div> -->
    <table id="board" v-if="!!this.gameDetails">
      <tr>
        <td :class="this.game[0]" v-on:click="chooseSpace(0)"></td>
        <td :class="this.game[1]" v-on:click="chooseSpace(1)"></td>
        <td :class="this.game[2]" v-on:click="chooseSpace(2)"></td>
      </tr>
      <tr>
        <td :class="this.game[3]" v-on:click="chooseSpace(3)"></td>
        <td :class="this.game[4]" v-on:click="chooseSpace(4)"></td>
        <td :class="this.game[5]" v-on:click="chooseSpace(5)"></td>
      </tr>
      <tr>
        <td :class="this.game[6]" v-on:click="chooseSpace(6)"></td>
        <td :class="this.game[7]" v-on:click="chooseSpace(7)"></td>
        <td :class="this.game[8]" v-on:click="chooseSpace(8)"></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { GetGameQuery } from '@/api/queries'
import { PlayGameMutation } from '@/api/mutations'
import { OnGamePlaySubscription } from '@/api/subscriptions'
import { mapGetters } from 'vuex'

export default {
  name: 'tictactoe-game',

  data () {
    return {
      gameDetails: {}
    }
  },

  computed: {
    ...mapGetters({
      gameId: 'currentGameId',
      username: 'currentUsername'
    }),

    game: function () {
      if (this.gameDetails.hasOwnProperty('Game') && this.gameDetails.Game) {
        return this.gameDetails.Game
      }

      return Array.from(Array(9).keys())
    },

    isMyTurn: function () {
      return this.gameDetails.Turn === this.username
    },

    myMark: function () {
      return this.gameDetails.OPlayer === this.username ? 'O' : 'X'
    },

    opponentName: function () {
      return this.gameDetails.HostId === this.username ? this.gameDetails.OpponentId : this.gameDetails.HostId
    }
  },

  methods: {
    checkForWinner: function (player) {
      if (
        (this.game[0] === player && this.game[1] === player && this.game[2] === player) ||
        (this.game[3] === player && this.game[4] === player && this.game[5] === player) ||
        (this.game[6] === player && this.game[7] === player && this.game[8] === player) ||
        (this.game[0] === player && this.game[3] === player && this.game[6] === player) ||
        (this.game[1] === player && this.game[4] === player && this.game[7] === player) ||
        (this.game[2] === player && this.game[5] === player && this.game[8] === player) ||
        (this.game[0] === player && this.game[4] === player && this.game[8] === player) ||
        (this.game[2] === player && this.game[4] === player && this.game[6] === player)
      ) {
        return true
      } else {
        return false
      }
    },

    clearGame: function () {
      // return this.game.filter(s => s !== 'O' && s !== 'X')
    },

    chooseSpace: function (spaceIndex) {
      // TODO: check if game is finished also
      if (!this.isMyTurn) {
        return
      }

      let updatedGame = Array.from(this.game)
      updatedGame[spaceIndex] = this.myMark

      const newData = {
        gameId: this.gameId,
        turn: this.opponentName,
        game: updatedGame
      }

      if (this.game[spaceIndex] !== 'X' || this.game[spaceIndex] !== 'O') {
        this.$apollo.mutate({
          mutation: PlayGameMutation,
          variables: newData,
          update: (store, { data: { playGame } }) => {
            const query = {
              query: GetGameQuery,
              variables: { gameId: playGame.GameId }
            }

            const data = store.readQuery(query)
            data.getGame.Game = playGame.Game
            store.writeQuery({ ...query, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            playGame: {
              __typename: 'Game',
              GameId: this.gameId,
              Turn: this.opponentName,
              Game: updatedGame
            }
          }
        }).catch((error) => {
          console.error(error)
        })
      }
      // checkForWinner()
    }
  },

  apollo: {
    gameDetails: {
      query: GetGameQuery,
      variables () {
        return {
          gameId: this.gameId
        }
      },
      result ({ data, loader, networkStatus }) {
        console.log(data)
      },
      update: data => data.getGame,
      skip () {
        return !this.gameId
      },
      subscribeToMore: {
        document: OnGamePlaySubscription,
        variables () {
          return {
            gameId: this.gameId
          }
        },
        updateQuery: (prev, { subscriptionData }) => {
          let newData = subscriptionData.data.onGamePlay
          let updatedGame = Object.assign({}, prev.getGame, newData)
          return {
            getGame: {
              __typename: 'Game',
              ...updatedGame
            }
          } // end return
        }
      }
    }
  }
}
</script>

<style scoped>
  table {
    border-collapse: collapse;
    margin: 0 auto;
  }

  td {
    border: 6px solid #222;
    height: 8rem;
    width: 8rem;
  }

  td:first-of-type {
    border-left-color: transparent;
    border-top-color: transparent;
  }

  td:nth-of-type(2) {
    border-top-color: transparent;
  }

  td:nth-of-type(3) {
    border-right-color: transparent;
    border-top-color: transparent;
  }

  tr:nth-of-type(3) td {
    border-bottom-color: transparent;
  }

  td:after {
    content: '';
    display: block;
  }

  table#board td {
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
  }

  table#board td.X, table#board td.O {
    cursor: default;
    font-size: 3rem;
    font-weight: bold;
  }

  td.X:after {
    color: hsl(141, 71%, 48%);
    content: 'X';
  }

  td.O:after {
    color: hsl(204, 86%, 53%);
    content: 'O';
  }
</style>
