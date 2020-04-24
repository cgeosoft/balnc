import express from 'express';
import { build } from '../build';
import { config } from '../config';
import { ogCtrl } from "./og.controller";

export const api = express.Router();

api.use("/og", ogCtrl)

api.use("/", (req, res) => {
    res.json({
        message: "server online",
        release: `v${config.build.version}`,
        environment: process.env.NODE_ENV === "production" ? 'production' : 'development',
        build,
    })
})

api.use('/debug-sentry', (req, res) => {
    throw new Error('My first Sentry error!');
});