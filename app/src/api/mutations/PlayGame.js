import gql from 'graphql-tag'

const PlayGameMutation = gql`
  mutation playGame($gameId: ID!, $turn: String!, $game: [String]!) {
    playGame(GameId: $gameId, Turn: $turn, Game: $game) {
      GameId
      Game
      Turn
      StatusDate
    }
  }
`

export default PlayGameMutation
