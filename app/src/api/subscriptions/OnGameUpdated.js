import gql from 'graphql-tag'

const OnGameUpdatedSubscription = gql`
  subscription onGameUpdated($gameId:ID!) {
    onGameUpdated(GameId: $gameId) {
      GameId
      Game
      Turn
    }
  }
`

export default OnGameUpdatedSubscription
