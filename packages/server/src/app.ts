import * as Sentry from '@sentry/node';
import cors from 'cors';
import express from "express";
import helmet from 'helmet';
import PouchDB from 'pouchdb';
import { api } from './api/routes';
import { logger, loggerMiddleware } from './commons/logger';
import { config, pouchdbCorsParams } from './config';

Sentry.init({
    release: `v${config.build.version}`,
    environment: process.env.NODE_ENV === "production" ? 'production' : 'development',
    dsn: config.sentry.dsn
});

const db = require("express-pouchdb")(PouchDB.defaults({
    prefix: './data/'
}), {
    configPath: './config/db.json',
    logPath: './logs/db.log',
    overrideMode: {
      exclude: ['routes/fauxton']
    }
})

const app = express();

app.use("/db", cors(pouchdbCorsParams), db);

app.use(helmet());

app.use(Sentry.Handlers.requestHandler());
app.use(loggerMiddleware);

app.use('/api', cors(), api);

app.use((req, res, next) => {
    res.status(404).send("Not found")
})

app.use(Sentry.Handlers.errorHandler());
app.use((err, req, res, next) => {
    logger.error(`unhandled error`, {
        sentry: res.sentry
    })
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
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`server is running in ${PORT}`)
})