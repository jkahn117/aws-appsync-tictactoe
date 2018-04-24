import gql from 'graphql-tag'

const DeclineGameMutation = gql`
  mutation declineGame($gameId: ID!) {
    declineGame(GameId: $gameId) {
      GameId
    }
  }
`

export default DeclineGameMutation
