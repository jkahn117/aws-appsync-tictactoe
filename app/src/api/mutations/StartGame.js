import gql from 'graphql-tag'

const StartGameMutation = gql`
  mutation startGame($gameId: ID!) {
    startGame(GameId: $gameId) {
      GameId
      HostId
      OpponentId
      OPlayer
      Turn
      Game
    }
  }
`

export default StartGameMutation
