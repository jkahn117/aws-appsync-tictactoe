import gql from 'graphql-tag'

const ListCompletedQuery = gql`
  query listCompleted($username:String!) {
    finished(username: $username) {
      games {
        GameId
        HostId
        OpponentId
      }
      nextToken
    }
  }
`

export default ListCompletedQuery
