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

export function uid() {
  return Math.floor((1 + Math.random()) * 0x100000000)
    .toString(16)
    .substring(1)
}

export async function createDBs(user) {
  const prefix = `b${uid()}`;
  await Promise.all(dbs.map(db => createDB(`${prefix}_${db}`)))
  await Promise.all(dbs.map(db => createSecurity(`${prefix}_${db}`, user, prefix)))

  return {
    statusCode: 200,
    body: JSON.stringify({
      prefix: prefix,
      dbs,
      owner: user,
    })
  }
}

export async function removeDBs(user, prefix) {
  const owner = await new Promise((resolve, reject) => {
    request.get({
      url: `${process.env.DB_HOST}/${prefix}_${dbs[0]}/_security`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true
    }, (error, response, body) => {
      if (error) {
        reject({ name: db, error })
        return
      }
      console.log(`${process.env.DB_HOST}/${prefix}_${dbs[0]}/_security`, "body", body)
      resolve(body.admins.names[0])
    })
  })

  console.log("owner", owner)

  if (user != owner) {
    throw new Error("not authorized")
  }

  await Promise.all(dbs.map(db => removeDB(`${prefix}_${db}`)))

  return {
    statusCode: 200,
    body: JSON.stringify({
      dbs
    })
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

export function getUser(name, password) {
  return new Promise((resolve, reject) => {
    request.post({
      url: `${process.env.DB_HOST}/_session`,
      form: { name, password }
    }, (error, response, body) => {
      if (error || body.error) {
        reject(error || body.error)
        return
      }
      resolve(JSON.parse(body))
    })
  })
}