import gql from 'graphql-tag'

const ListInvitesQuery = gql`
  query listInvites($username:String!) {
    invites(username: $username) {
      games {
        GameId
        HostId
        StartDate
      }
      nextToken
    }
  }
`

export default ListInvitesQuery
