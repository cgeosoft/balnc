require("dotenv").config();
const request = require('request');

export const service = {
  auth: false,
  cors: (event) => {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        'Access-Control-Allow-Headers': "content-type"
      },
      body: JSON.stringify(event)
    }
  },
  getUser: (username) => {
    return new Promise((resolve, reject) => {
      request.get({
        url: `${process.env.DB_HOST}/_users/_all_docs`,
        auth: service.auth,
        json: true,
      }, (error, response, body) => {
        if (error || body.error) {
          reject(error || body.error)
          return
        }
        const user = body.rows.find(u => u.key === `org.couchdb.user:${username}`)
        resolve({
          userId: user ? user.id : null
        })
      })
    })
  },
  createUser: (username, password) => {
    const _body = {
      name: username,
      password: password,
      roles: [],
      type: "user"
    }
    return new Promise((resolve, reject) => {
      request.put({
        url: `${process.env.DB_HOST}/_users/org.couchdb.user:${username}`,
        auth: service.auth,
        json: true,
        body: _body
      }, (error, response, body) => {
        if (error) {
          reject(error)
          return
        }
        resolve({
          userId: body.id
        })
      })
    })
  }
}
