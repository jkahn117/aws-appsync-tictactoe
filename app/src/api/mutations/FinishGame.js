import gql from 'graphql-tag'

const FinishGameMutation = gql`
  mutation finishGame($gameId: ID!) {
    finishGame(GameId: $gameId) {
      GameId
    }
  }
`

export default FinishGameMutation
