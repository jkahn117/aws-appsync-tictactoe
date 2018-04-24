import gql from 'graphql-tag'

const OnGameUpdateSubscription = gql`
  subscription onGameUpdate($gameId: ID!) {
    onGameUpdate(GameId: $gameId) {
      GameId
      Turn
    }
  }
`

export default OnGameUpdateSubscription
