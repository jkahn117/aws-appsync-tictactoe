import gql from 'graphql-tag'

const PlayersQuery = gql`
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

export default PlayersQuery
