import gql from 'graphql-tag'

const ListInProgressQuery = gql`
  query listInProgress($username:String!) {
    inProgress(username: $username) {
      games {
        GameId
        HostId
        OpponentId
        UpdateDate
        Turn
      }
      nextToken
    }
  }
`

export default ListInProgressQuery
