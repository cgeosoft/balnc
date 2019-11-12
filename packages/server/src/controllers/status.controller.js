import express from 'express';
import { started } from "../commons/service";

const routes = express.Router();

routes
  .route("/")
  .get((req, res) => {
    return res.json({
      started: started,
      db: process.env.DB_HOST_EXTERNAL,
    })
  })

module.exports = routes;