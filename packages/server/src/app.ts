import cors from 'cors';
import express from "express";
import helmet from 'helmet';
import PouchDB from 'pouchdb';
import winston from 'winston';
import { build } from './build';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const expressPouchdb = require("express-pouchdb");
const pouchDB = expressPouchdb(PouchDB.defaults({
    prefix: './data/'
}))

var whitelist = ['http://localhost:4200', 'http://localhost:8000', 'https://balnc.cgeosoft.com']

const app = express();
const pouchdbCorsParams = {
    credentials: true,
    origin: (origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error(`Not allowed by CORS [${origin}]`))
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

app.get("/", (req, res) => {
    res.json({
        message: "server online",
        ...build
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`)
})