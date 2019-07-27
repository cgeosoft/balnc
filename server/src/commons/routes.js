import express from 'express';
import { handler as profiles } from "../handlers/profiles";
import { handler as status } from "../handlers/status";
import response from '../helpers/response';

const routes = express.Router();

routes.get("/status", async (req, res, next) => {
  try {
    const results = await status()
    return res
      .status(results.statusCode)
      .type('application/json')
      .send(results.body);
  } catch (e) {
    next(e)
  }
})

routes
  .route("/profiles")
  .get(async (req, res, next) => {
    try {
      const event = {
        httpMethod: "GET",
        headers: { Authorization: req.headers.authorization }
      }
      const results = await profiles(event)
      return res
        .status(results.statusCode)
        .type('application/json')
        .send(results.body);
    } catch (e) {
      next(e)
    }
  })
  .post(async (req, res, next) => {
    try {
      const event = {
        httpMethod: "POST",
        headers: { Authorization: req.headers.authorization },
        body: JSON.stringify(req.body)
      }
      const results = await profiles(event)
      return res
        .status(results.statusCode)
        .type('application/json')
        .send(results.body);
    } catch (e) {
      next(e)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const event = {
        httpMethod: "DELETE",
        headers: { Authorization: req.headers.authorization },
        queryStringParameters: req.query
      }
      const results = await profiles(event)
      return res
        .status(results.statusCode)
        .type('application/json')
        .send(results.body);
    } catch (e) {
      next(e)
    }
  })

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

routes.use((req, res) => {
  response.sendNotFound(res);
});

module.exports = routes;