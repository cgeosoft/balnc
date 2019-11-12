import request from 'request';

export const dbs = [
  "projects_projects",
  "projects_issues",
  "projects_logs",
  "boards_messages",
  "boards_boards",
]

export const started = Date.now()

function promiseCallback(error, body, resolve, reject) {
  if (error) {
    return reject({ error })
  }
  if (body && body.error) {
    return reject(body)
  }
  return resolve(body)
};

export function authUser(authorization) {
  if (!authorization)
    throw new Error({
      error: 'unauthorized',
      reason: "Missing credentials"
    })
  var encodedCreds = authorization.split(' ')[1]
  var plainCreds = (new Buffer.from(encodedCreds, 'base64')).toString().split(':')
  var name = plainCreds[0]
  var password = plainCreds[1]

  return new Promise((res, rej) => {
    request
      .post({
        url: `${process.env.DB_HOST}/_session`,
        form: { name, password },
        json: true,
      }, (e, r, b) => promiseCallback(e, b, res, rej))
  })
}

export function uid() {
  return Math.floor((1 + Math.random()) * 0x100000000)
    .toString(16)
    .substring(1)
}

export async function createDB(name, owner, group) {
  await new Promise((res, rej) => {
    request.put({
      url: `${process.env.DB_HOST}/${name}`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true
    }, (e, r, b) => promiseCallback(e, b, res, rej))
  })
  await new Promise((res, rej) => {
    const _admins = owner ? { names: [owner] } : {}
    request.put({
      url: `${process.env.DB_HOST}/${name}/_security`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true,
      body: {
        admins: _admins, members: { roles: [group] }
      }
    }, (e, r, b) => promiseCallback(e, b, res, rej))
  })
}

export function removeDB(db) {
  return new Promise((res, rej) => {
    request.delete({
      url: `${process.env.DB_HOST}/${db}`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true
    }, (e, r, b) => promiseCallback(e, b, res, rej))
  })
}

export function getUser(username) {
  return new Promise((res, rej) => {
    request.get({
      url: `${process.env.DB_HOST}/_users/org.couchdb.user:${username}`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true
    }, (e, r, b) => promiseCallback(e, b, res, rej))
  })
}

export function updateUser(user) {
  return new Promise((res, rej) => {
    request.put({
      url: `${process.env.DB_HOST}/_users/org.couchdb.user:${user.name}`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true,
      body: user
    }, (e, r, b) => promiseCallback(e, b, res, rej))
  })
}

export async function getManifest(key) {
  return new Promise((res, rej) => {
    request.get({
      url: `${process.env.DB_HOST}/${key}/manifest`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true,
    }, (e, r, b) => promiseCallback(e, b, res, rej))
  })
}

export async function createManifest(key, owner, profileName) {
  return new Promise((res, rej) => {
    const _name = profileName || `Profile #${Date.now()}`
    request.post({
      url: `${process.env.DB_HOST}/${key}`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true,
      body: {
        _id: "manifest",
        key: key,
        name: _name,
        created: Date.now(),
        owner: owner,
        members: [
          owner
        ]
      }
    }, (e, r, b) => promiseCallback(e, b, res, rej))
  })
}

export async function updateManifest(manifest) {
  return new Promise((res, rej) => {
    request.put({
      url: `${process.env.DB_HOST}/${manifest.key}/manifest`,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
      json: true,
      body: manifest
    }, (e, r, b) => promiseCallback(e, b, res, rej))
  })
}

