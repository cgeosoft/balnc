import express from 'express';
import { OgController } from "../controllers/og.controller";
import { sendNotFound } from '../helpers/response';

export const routes = express.Router();

routes.use("/og", OgController)

routes.use((req, res) => {
  sendNotFound(res);
});

routes.use((err: any, req: any, res: any, next: any) => {
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
