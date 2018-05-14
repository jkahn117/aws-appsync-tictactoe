<template>
  <div>
    <div v-if="this.gameId">
      <h3 class="title is-3">
        My Game vs {{ this.opponentName }}
        <span class="tag is-warning is-rounded" v-if="this.isMyTurn">MY TURN</span>
      </h3>
      <h5 class="subtitle is-5">
        last play: {{ this.gameDetails.UpdateDate | since }} | me: {{ this.myMark }}
      </h5>
    </div>
    <div v-else>
      <h3 class="title is-3">
        Start a New Game
      </h3>
    </div>

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
import { PlayGameMutation, FinishGameMutation } from '@/api/mutations'
import { OnGamePlaySubscription } from '@/api/subscriptions'
import { mapGetters } from 'vuex'
import moment from 'moment'

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

    isFinished: function () {
      return this.gameDetails.StatusDate.startsWith('FINISHED')
    },

    myMark: function () {
      return this.gameDetails.OPlayer === this.username ? 'O' : 'X'
    },

    opponentName: function () {
      return this.gameDetails.HostId === this.username ? this.gameDetails.OpponentId : this.gameDetails.HostId
    }
  },

  filters: {
    since: function (timestamp) {
      return moment(timestamp, 'X').fromNow()
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

    chooseSpace: function (spaceIndex) {
      if (!this.isMyTurn || this.isFinished) {
        return
      }

      let updatedGame = Array.from(this.game)
      updatedGame[spaceIndex] = this.myMark

      const newData = {
        gameId: this.gameId,
        turn: this.opponentName,
        game: updatedGame
      }

      // first, mark the space
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
              Game: updatedGame,
              StatusDate: this.gameDetails.StatusDate
            }
          }
        }).catch((error) => {
          console.error(error)
        })
      }

      // then check if this is a winner
      if (this.checkForWinner(this.myMark)) {
        // show some sort of banner
        console.log('!!!! WINNER !!!!')

        this.$apollo.mutate({
          mutation: FinishGameMutation,
          variables: {
            gameId: this.gameId
          },
          update: (store, { data: { finishGame } }) => {
            const query = {
              query: GetGameQuery,
              variables: { gameId: this.gameId }
            }

            const data = store.readQuery(query)
            data.getGame.StatusDate = finishGame.StatusDate
            store.writeQuery({ ...query, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            finishGame: {
              __typename: 'Game',
              GameId: this.gameId,
              StatusDate: this.gameDetails.StatusDate.replace('IN_PROGRESS', 'FINISHED')
            }
          }
        })
      }
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
      // result ({ data, loader, networkStatus }) {
      //   console.log(data)
      // },
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
  #board {
    margin-top: 2rem;
  }

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
