import cors from 'cors';
import express from "express";
import helmet from 'helmet';
import PouchDB from 'pouchdb';
import { build } from './build';
import { logger } from './commons/logger';
import { routes } from './commons/routes';

const expressPouchdb = require("express-pouchdb");
const pouchDB = expressPouchdb(PouchDB.defaults({
    prefix: './data/'
}))

var whitelist = ['http://localhost:4200', 'http://localhost:8000', 'https://balnc.cgeosoft.com']

const app = express();
const pouchdbCorsParams = {
    credentials: true,
    origin: (requestOrigin: any, callback: any) => {
        if (whitelist.indexOf(requestOrigin) !== -1 || !requestOrigin) {
            callback(null, true)
        } else {
            callback(new Error(`Not allowed by CORS [${requestOrigin}]`))
        }
    },
    allowedHeaders: "accept, authorization, content-type, origin, referer",
    methods: "GET, PUT, POST, HEAD, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use("/db", cors(pouchdbCorsParams), pouchDB);

app.use(helmet());
app.use("/", cors());
app.use('/api', cors(), routes);

app.get("/", (req, res) => {
    res.json({
        message: "server online",
        ...build
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`server is running in ${PORT}`)
})