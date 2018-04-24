import gql from 'graphql-tag'

const PlayerGamesQuery = gql`
  query playerGames($playerId:String!) {
    playerGames(PlayerId: $playerId) {
      Invited {
        GameId
        HostId
        StartDate
      }
      Active {
        GameId
        HostId
        OpponentId
        UpdateDate
        Turn
      }
      Finished {
        GameId
        HostId
        OpponentId
        UpdateDate
      }
    }
  }
`

export default PlayerGamesQuery
