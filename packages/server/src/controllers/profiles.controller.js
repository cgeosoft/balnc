import express from 'express';
import { authUser, createDB, createManifest, dbs, getManifest, getUser, removeDB, uid, updateManifest, updateUser } from "../commons/service";

const routes = express.Router();

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

async function AuthMiddleware(req, res, next) {
  try {
    req.user = await authUser(req.headers.authorization)
    next()
  } catch (e) {
    next(e)
  }
}

routes.use("/", AuthMiddleware)
routes.use("/:key", AuthMiddleware)

routes.route("/")
  .get(asyncMiddleware(async (req, res) => {
    const user = await getUser(req.user.name)
    return res.json({
      user: req.user.name,
      profiles: req.user.roles
    })
  }))
  .post(asyncMiddleware(async (req, res, next) => {
    const user = await getUser(req.user.name)

    const key = `b${uid()}`;
    user.roles.push(key)
    await updateUser(user)

    await createDB(key, null, key)
    const manifest = await createManifest(key, user.name, req.body.name)
    await Promise.all(dbs.map(db => createDB(`${key}_${db}`, user.name, key)))

    return res.json({
      dbs,
      key: key,
      name: manifest.name,
      owner: user.name,
    })
  }))

routes.route("/:key")

  .get(asyncMiddleware(async (req, res, next) => {

    const user = await getUser(req.user.name)
    if (!user.roles.find(p => p === req.params.key))
      throw new Error({
        error: 'unauthorized',
        reason: "You have not access to this profile"
      })

    const manifest = await getManifest(req.params.key)

    return res.json(manifest)
  }))

  .put(asyncMiddleware(async (req, res, next) => {

    const user = await getUser(req.user.name)
    if (!user.roles.find(p => p === req.params.key))
      throw new Error({
        error: 'unauthorized',
        reason: "You have not access to this profile"
      })

    const manifest = await getManifest(req.params.key)

    if (user.name != manifest.owner) {
      throw new Error({
        error: 'unauthorized',
        reason: "You have to be the owner of this profile"
      })
    }

    const removedMembers = manifest.members.filter((m) => req.body.members.indexOf(m) === -1)
    removedMembers.forEach(async (removedMember) => {
      const removedUser = await getUser(removedMember)
      removedUser.roles = removedUser.roles.filter(r => r !== manifest.key)
      await updateUser(removedUser)
    })

    const addedMembers = req.body.members.filter((m) => manifest.members.indexOf(m) === -1)
    addedMembers.forEach(async (addedMember) => {
      const addedUser = await getUser(addedMember)
      addedUser.roles.push(manifest.key)
      await updateUser(addedUser)
    })

    manifest.name = req.body.name
    manifest.members = req.body.members
    updateManifest(manifest)

    return res.json(manifest)
  }))

  .delete(asyncMiddleware(async (req, res, next) => {

    const user = await getUser(req.user.name)
    if (!user.roles.find(p => p === req.params.key))
      throw new Error({
        error: 'unauthorized',
        reason: "You have not access to this profile"
      })

    const manifest = await getManifest(req.params.key)

    if (user.name != manifest.owner) {
      throw new Error({
        error: 'unauthorized',
        reason: "You have to be the owner of this profile"
      })
    }

    manifest.members.forEach(async (member) => {
      const removedUser = await getUser(member)
      removedUser.roles = removedUser.roles.filter(r => r !== manifest.key)
      await updateUser(removedUser)
    })

    await removeDB(req.params.key)
    await Promise.all(dbs.map(db => removeDB(`${req.params.key}_${db}`)))

    return res.send()
  }))

module.exports = routes;