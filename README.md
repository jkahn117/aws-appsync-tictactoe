# aws-appsync-tictactoe-web

> AWS AppSync example

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Schema

```
type Game {
	GameId: ID!
	HostId: String!
	StatusDate: String!
	OpponentId: String!
	OPlayer: String!
	Turn: String!
	Game: String
}

type GameConnection {
	games: [Game]
	nextToken: String
}

type Mutation {
	# Create a new game
	createGame(HostId: String!, OpponentId: String!, Timestamp: String!): Game
	# Update the state of game play
	updateGame(GameId: ID!, Game: String!): Game
	# Put a single value of type 'Game'.
	####### If an item exists it's updated. If it does not it's created.
	putGame(
		GameId: ID!,
		HostId: String!,
		StatusDate: String!,
		OpponentId: String!,
		OPlayer: String!,
		Turn: String!,
		Game: String
	): Game
	# Delete a single value of type 'Game' by a primary key.
	deleteGame(GameId: ID!): Game
}

type Player {
	Id: ID!
	Username: String!
}

type Query {
	allPlayers: [Player]
	invites(username: String!, count: Int, nextToken: String): GameConnection
	inProgress(username: String!, count: Int, nextToken: String): GameConnection
	finished(username: String!, count: Int, nextToken: String): GameConnection
	# Get a single value of type 'Game' by primary key.
	getGame(GameId: ID!): Game
}

type Subscription {
	onInvited(OpponentId: String!): Game
		@aws_subscribe(mutations: ["createGame"])
}

schema {
	query: Query
	mutation: Mutation
	subscription: Subscription
}
```



## References

* https://docs.aws.amazon.com/appsync/latest/devguide/building-a-client-app-javascript.html
* https://hackernoon.com/full-stack-vue-with-graphql-aws-appsync-adc5af474dc9