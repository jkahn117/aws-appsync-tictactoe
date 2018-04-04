import gql from 'graphql-tag'

const AllPlayersQuery = gql`
  query allPlayers {
    allPlayers {
      players {
        Id
        Username
      }
      nextToken
    }
  }
`

export default AllPlayersQuery
