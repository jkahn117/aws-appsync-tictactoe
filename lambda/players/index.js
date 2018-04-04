/**
 * [description]
 * 
 */

const CognitoProvider = require('aws-sdk/clients/cognitoidentityserviceprovider')
const client = new CognitoProvider({ region: 'us-west-2' })
const jmespath = require('jmespath')

USER_POOL_ID = process.env.USER_POOL_ID

exports.handler = async (event) => {
  let params = {
    UserPoolId: USER_POOL_ID,
    AttributesToGet: [
      'sub'
    ],
    Filter: 'cognito:user_status = \"Confirmed\"',
    Limit: 20
  }

  if (event.hasOwnProperty('PaginationToken')) {
    params['PaginationToken'] = event.PaginationToken
  }

  let result = {}
  try {
    let data = await client.listUsers(params).promise()
    
    result['players'] = jmespath.search(data,
      "Users[*].{ Username: Username, Id: (Attributes[?Name=='sub'].Value | [0]) }"
    )

    if (data.hasOwnProperty('PaginationToken')) {
      result['nextToken'] = data.PaginationToken
    }
  } catch (error) {
    console.error(error)
    return error
  }

  return result
}
