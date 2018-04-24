import gql from 'graphql-tag'

const OnGamePlaySubscription = gql`
  subscription onGamePlay($gameId: ID!) {
    onGamePlay(GameId: $gameId) {
      GameId
      Game
      Turn
    }
  }
`

export default OnGamePlaySubscription
