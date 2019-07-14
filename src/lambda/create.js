const dotenv = require("dotenv")
const request = require('request');

dotenv.config();

const dbs = [
  "projects_projects",
  "projects_issues",
  "projects_logs",
  "boards_messages",
  "boards_boards",
]

function uid() {
  return Math.floor((1 + Math.random()) * 0x100000000)
    .toString(16)
    .substring(1)
}

function create(prefix, db, owner) {
  return new Promise((resolve, reject) => {
    console.log(`put ${prefix}_${db}`)
    request.put({
      url: `${process.env.DB_HOST}/${prefix}_${db}`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true
    }, (error, response, body) => {
      if (error) {
        reject({ db, error })
        return
      }
      security(`${prefix}_${db}`, owner, prefix)
        .then(() => {
          resolve()
        })
        .catch((err) => reject(err))
    })
  })
}

function security(name, owner, group) {
  return new Promise((resolve, reject) => {
    console.log(`put security ${name}`)
    request.put({
      url: `${process.env.DB_HOST}/${name}/_security`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true,
      body: {
        admins: { names: [owner] }, members: { roles: [group] }
      }
    }, (error, response, body) => {
      if (error) {
        reject({ name, error })
        return
      }
      resolve()
    })
  })
}



exports.handler = function (event, context, callback) {

  // event
  // {
  //     "path": "Path parameter",
  //     "httpMethod": "Incoming request's method name"
  //     "headers": {Incoming request headers}
  //     "queryStringParameters": {query string parameters }
  //     "body": "A JSON string of the request payload."
  //     "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
  // }

  if (event.httpMethod === 'OPTIONS') {
    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "content-type"
      },
    });
    return;
  }

  const _data = JSON.parse(event.body)
  const owner = _data.user
  const prefix = `balnc_${uid()}`;
  const prom = dbs.map(db => create(prefix, db, owner))
  Promise.all(prom)
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          prefix: prefix
        })
      })
    })
    .catch(error => {
      callback(error.message)
    })
};