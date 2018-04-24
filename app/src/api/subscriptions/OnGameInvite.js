import gql from 'graphql-tag'

const OnGameInviteSubscription = gql`
  subscription onGameInvite($playerId:String!) {
    onGameInvite(OpponentId: $playerId) {
      GameId
      HostId
      StartDate
    }
  }
`

export default OnGameInviteSubscription
