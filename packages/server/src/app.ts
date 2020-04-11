import express from "express";
import PouchDB from 'pouchdb';

const expressPouchdb = require("express-pouchdb");
const app = express();

const pouchDB = expressPouchdb(PouchDB.defaults({
    prefix: './data/'
}))

app.use('/db', pouchDB);

app.get("/", (req, res) => {
    res.send("server online")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
})