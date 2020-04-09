import express from 'express';
import og from "../controllers/og.controller";
import profiles from "../controllers/profiles.controller";
import status from "../controllers/status.controller";
import response from '../helpers/response';

const routes = express.Router();

routes.use("/status", status)
routes.use("/profiles", profiles)
routes.use("/og", og)

routes.use((req, res) => {
  response.sendNotFound(res);
});

routes.use((err, req, res, next) => {
  if (err.error === "not_found") {
    return res.status(401).json(err)
  }
  if (err.error === "unauthorized") {
    return res.status(401).json(err)
  }
  if (err.error && err.error.code === "ECONNREFUSED") {
    return res.status(503).json({ error: "Offline", details: "Database is offline" })
  }
  res.status(500).send('Something broke!')
  console.log(err)
})

module.exports = routes;