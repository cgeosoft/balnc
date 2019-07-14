const dotenv = require("dotenv");
const { service } = require('./lib');

dotenv.config();

if (process.env.DB_USER) {
  service.auth = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  }
}

export async function handler(event, context) {

  // event
  // {
  //     path: "Path parameter",
  //     "httpMethod": "Incoming request's method name"
  //     "headers": {Incoming request headers}
  //     "queryStringParameters": {query string parameters }
  //     "body": "A JSON string of the request payload."
  //     "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
  // }

  if (event.httpMethod === 'OPTIONS') {
    return service.cors(event)
  }

  const _data = JSON.parse(event.body)

  const username = _data.username
  const password = _data.password

  const userResult = await service.getUser(username)
  if (!userResult || userResult.error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "error",
        reason: userResult.reason || "unknown error",
      })
    }
  }

  if (userResult.userId) {
    return {
      statusCode: 409,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "user_exists",
        reason: "Username is in use",
        user: userResult.userId
      })
    }
  }

  const registerResult = await service.createUser(username, password)
  if (!registerResult || registerResult.error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "error",
        reason: registerResult.reason || "unknown error",
      })
    }
  }

  if (registerResult) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: registerResult.userId
      })
    }
  }
};