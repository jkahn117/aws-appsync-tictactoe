import gql from 'graphql-tag'

const FinishGameMutation = gql`
  mutation finishGame($gameId: ID!) {
    finishGame(GameId: $gameId) {
      GameId
      StatusDate
      Turn
    }
  }
`

export default FinishGameMutation
