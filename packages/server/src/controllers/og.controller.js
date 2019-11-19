import express from 'express';
import ogs from 'open-graph-scraper';

const routes = express.Router();

routes
    .route("/")
    .get((req, res, next) => {
        console.log("load", req.query.q)
        ogs({ url: req.query.q }, (error, results) => {
            if (error) {
                next(error) // Pass errors to Express.
            } else {
                res.json(results)
            }
        })
    })

module.exports = routes;