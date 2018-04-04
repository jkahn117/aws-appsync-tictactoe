import gql from 'graphql-tag'

const CreateGameMutation = gql`
  mutation createGame($opponentId: String!) {
    createGame(HostId: "josh", OpponentId: $opponentId) {
      GameId
      HostId
      OpponentId
      OPlayer
      Turn
      Game
    }
  }
`

export default CreateGameMutation
