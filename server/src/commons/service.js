import dotenv from "dotenv";
import request from 'request';

dotenv.config();

const dbs = [
  "projects_projects",
  "projects_issues",
  "projects_logs",
  "boards_messages",
  "boards_boards",
]

export const started = Date.now()

export async function createDBs(username, profileName) {
  const key = `b${uid()}`;

  const user = await getUser(username)
  user.roles.push(key)
  await updateUser(user)

  await createMasterDB(key, user.name, profileName)

  await Promise.all(dbs.map(db => createModuleDB(db, username, key)))

  return {
    statusCode: 200,
    body: JSON.stringify({
      key: key,
      dbs,
      owner: username,
    })
  }
}

export async function removeDBs(username, key) {
  const user = await getUser(username)

  if (username != user.name) {
    throw new Error("not authorized")
  }

  user.roles = user.roles.filter(r => r !== key)
  await updateUser(user)
  await removeDB(key)
  await Promise.all(dbs.map(db => removeDB(`${key}_${db}`)))

  return {
    statusCode: 200,
    body: JSON.stringify({
      dbs
    })
  }
}

export function authUser(event) {
  var authHeader = event.headers.Authorization
  if (!authHeader) throw new Error('Unauthorized')
  var encodedCreds = authHeader.split(' ')[1]
  var plainCreds = (new Buffer.from(encodedCreds, 'base64')).toString().split(':')
  var name = plainCreds[0]
  var password = plainCreds[1]

  return new Promise((resolve, reject) => {
    request.post({
      url: `${process.env.DB_HOST}/_session`,
      form: { name, password },
      json: true,
    }, (error, response, body) => {
      if (error || body.error) {
        reject(error || body.error)
        return
      }
      resolve(body)
    })
  })
}

export function uid() {
  return Math.floor((1 + Math.random()) * 0x100000000)
    .toString(16)
    .substring(1)
}

export function cors(event) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      'Access-Control-Allow-Headers': "content-type"
    },
    body: JSON.stringify(event)
  }
}

function createDB(db) {
  return new Promise((resolve, reject) => {
    request.put({
      url: `${process.env.DB_HOST}/${db}`,
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
      resolve()
    })
  })
}

function updateUser(user) {
  return new Promise((resolve, reject) => {
    request.put({
      url: `${process.env.DB_HOST}/_users/org.couchdb.user:${user.name}`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true,
      body: user
    }, (error, response, body) => {
      if (error) {
        reject({ db, error })
        return
      }
      resolve()
    })
  })
}

function getUser(username) {
  return new Promise((resolve, reject) => {
    request.get({
      url: `${process.env.DB_HOST}/_users/org.couchdb.user:${username}`,
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
      resolve(body)
    })
  })
}

function createSecurity(db, user, group) {
  return new Promise((resolve, reject) => {
    request.put({
      url: `${process.env.DB_HOST}/${db}/_security`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true,
      body: {
        admins: { names: [user] }, members: { roles: [group] }
      }
    }, (error, response, body) => {
      if (error) {
        reject({ name: db, error })
        return
      }
      resolve()
    })
  })
}

function removeDB(db) {
  return new Promise((resolve, reject) => {
    request.delete({
      url: `${process.env.DB_HOST}/${db}`,
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
      resolve()
    })
  })
}

async function createMasterDB(db, owner, profileName) {
  await createDB(db)
  await createSecurity(db, owner, db)
  return new Promise((resolve, reject) => {
    request.post({
      url: `${process.env.DB_HOST}/${db}`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true,
      body: {
        _id: "manifest",
        name: profileName || `Profile #${Date.now()}`,
        created: Date.now(),
        owner: owner
      }
    }, (error, response, body) => {
      if (error) {
        reject({ db, error })
        return
      }
      resolve()
    })
  })
}

async function createModuleDB(db, key, owner) {
  await createDB(db)
  await createSecurity(db, owner, key)
}
