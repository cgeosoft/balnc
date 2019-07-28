import express from 'express';
import { authUser, createDB, createManifest, dbs, getManifest, getUser, removeDB, uid, updateUser } from "../commons/service";

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
  .get((req, res) => {
    return res.json({
      user: req.user.name,
      profiles: req.user.roles
    })
  })
  .post(asyncMiddleware(async (req, res, next) => {
    const user = await getUser(req.user.name)

    const key = `b${uid()}`;
    user.roles.push(key)
    await updateUser(user)

    await createDB(key, user.name, key)
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
  .delete(asyncMiddleware(async (req, res, next) => {
    const manifest = await getManifest(req.params.key)

    if (req.user.name != manifest.owner) {
      throw new Error({
        error: 'unauthorized',
        reason: "You have to be the owner of this profile"
      })
    }

    const user = await getUser(req.user.name)
    user.roles = user.roles.filter(r => r !== req.params.key)
    await updateUser(user)
    await removeDB(req.params.key)
    await Promise.all(dbs.map(db => removeDB(`${req.params.key}_${db}`)))

    return res.send()
  }))

module.exports = routes;