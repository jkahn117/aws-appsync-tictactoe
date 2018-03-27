import gql from 'graphql-tag'

const OnInvitedSubscription = gql`
  subscription onInvited($username:String!) {
    onInvited(OpponentId: $username) {
      GameId
      HostId
      StartDate
    }
  }
`

export default OnInvitedSubscription
