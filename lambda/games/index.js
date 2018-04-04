/**
 * [description]
 * 
 */

const DynamoDB = require('aws-sdk/clients/dynamodb')
const client = new DynamoDB.DocumentClient({ region: 'us-west-2' })
const util = require('util')

GAMES_TABLE = process.env.GAMES_TABLE


const getGamesWithStatus = async (username, status) => {
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
  
  let results = await Promise.all([
      client.query(hostParams).promise(), 
      client.query(opponentParams).promise()
    ])

  return [ ...results[0].Items, ...results[1].Items ]
}


exports.handler = async (event) => {
  console.log(util.inspect(event, { depth: 5 }))

  let data = []
  
  try {
    data = await getGamesWithStatus(event.username, event.status)
  } catch (error) {
    console.error(error)
    return error
  }

  return data
}