import gql from 'graphql-tag'

const UpdateGameMutation = gql`
  mutation updateGame($gameId:ID!, $game:[String]!) {
    updateGame(GameId: $gameId, Game: $game) {
      GameId
      Game
    }
  }
`

export default UpdateGameMutation
