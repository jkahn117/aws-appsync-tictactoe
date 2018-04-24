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
            <a class="button is-uppercase is-small is-primary" v-on:click="startGame(game)">Play</a>
            <a class="button is-small is-light" v-on:click="declineGame(game)">Decline</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BaseGames from './BaseGames'
import { StartGameMutation, DeclineGameMutation } from '@/api/mutations'
import { PlayerGamesQuery } from '@/api/queries'

export default {
  extends: BaseGames,
  name: 'tictactoe-invited-games',

  methods: {
    startGame: function (game) {
      console.log(`Starting game with ID ${game.GameId}`)
      this.$apollo.mutate({
        mutation: StartGameMutation,
        variables: {
          gameId: game.GameId
        },
        update: (store, { data: { startGame } }) => {
          const query = {
            query: PlayerGamesQuery,
            variables: { playerId: this.username }
          }

          const data = store.readQuery(query)
          // remove game from invites list
          data.playerGames.Invited = data.playerGames.Invited.filter(g => g.GameId !== startGame.GameId)
          // add game to active list
          const index = data.playerGames.Active.findIndex(g => g.GameId === startGame.GameId)
          if (index < 0) {
            data.playerGames.Active.push(startGame)
          } else {
            data.playerGames.Active[index] = startGame
          }
          // write the query result to the store
          store.writeQuery({ ...query, data })
        },
        optimisticResponse: {
          __typeName: 'Mutation',
          startGame: {
            __typename: 'Game',
            ...game,
            OpponentId: this.username,
            Turn: this.username,
            OPlayer: this.username,
            UpdateDate: this.getTimestamp(),
            Game: [ '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
          }
        }
      }).then((result) => {
        this.setCurrentGame(result.data.startGame.GameId)
      }).catch((error) => {
        console.error(error)
      })
    },

    declineGame: function (game) {
      console.log(`Declining game with ID ${game.GameId}`)
      this.$apollo.mutate({
        mutation: DeclineGameMutation,
        variables: {
          gameId: game.GameId
        },
        update: (store, { data: { declineGame } }) => {
          const query = {
            query: PlayerGamesQuery,
            variables: { playerId: this.username }
          }

          const data = store.readQuery(query)
          data.playerGames.Invited = data.playerGames.Invited.filter(g => g.GameId !== declineGame.GameId)
          store.writeQuery({ ...query, data })
        },
        optimisticResponse: {
          __typeName: 'Mutation',
          declineGame: {
            __typename: 'Game',
            ...game
          }
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
