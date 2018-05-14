import gql from 'graphql-tag'

const StartGameMutation = gql`
  mutation startGame($gameId: ID!) {
    startGame(GameId: $gameId) {
      GameId
      HostId
      OpponentId
      OPlayer
      Turn
      StatusDate
      UpdateDate
      Game
    }
  }
`

export default StartGameMutation
