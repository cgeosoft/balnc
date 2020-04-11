import cors from 'cors';
import express from "express";
import helmet from 'helmet';
import PouchDB from 'pouchdb';

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
            callback(new Error('Not allowed by CORS'))
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
    res.send("server online")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`)
})