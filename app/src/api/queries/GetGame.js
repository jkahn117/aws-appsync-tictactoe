import gql from 'graphql-tag'

const GetGameQuery = gql`
  query getGame($gameId:ID!) {
    getGame(GameId: $gameId) {
      GameId
      HostId
      OPlayer
      Turn
      Game
    }
  }
`

export default GetGameQuery
