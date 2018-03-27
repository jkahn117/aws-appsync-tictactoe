/**
 * [description]
 * 
 */

const DynamoDB = require('aws-sdk/clients/dynamodb')
const client = new DynamoDB.DocumentClient({ region: 'us-west-2' })
const util = require('util')

GAMES_TABLE = process.env.GAMES_TABLE

const getGamesWithStatus = (username, status) => {
  let hostParams = {
    TableName: GAMES_TABLE,
    IndexName: 'HostId-StatusDate-index',
    KeyConditionExpression: 'HostId = :username and begins_with(StatusDate, :status)',
    ExpressionAttributeValues: {
      ':username': username,
      ':status': status
    },
    Limit: 10
  }

  let opponentParams = {
    TableName: GAMES_TABLE,
    IndexName: 'OpponentId-StatusDate-index',
    KeyConditionExpression: 'OpponentId = :username and begins_with(StatusDate, :status)',
    ExpressionAttributeValues: {
      ':username': username,
      ':status': status
    },
    Limit: 10
  }

  return Promise.all([client.query(hostParams).promise(), client.query(opponentParams).promise()])
    .then(values => {
      return Promise.resolve([ ...values[0].Items, ...values[1].Items ])
    })
}


exports.handler = (event, context, callback) => {
  console.log(util.inspect(event, { depth: 5 }))

  getGamesWithStatus(event.username, event.status)
    .then(result => {
      callback(null, result)
    })
    .catch(error => {
      callback(error)
    })
}