import express from 'express';
///<reference path="../typings/open-graph-scraper.d.ts"/>
import ogs from 'open-graph-scraper';
import { sendBadRequest } from '../helpers/response';

export const OgController = express.Router();

OgController
    .route("/")
    .get((req: any, res: any, next: any) => {
        console.log("load", req.query.q)
        if (!req.query.q) return sendBadRequest(res, "no url")
        ogs({ url: req.query.q }, (error: any, results: any) => {
            if (error) {
                next(error) // Pass errors to Express.
            } else {
                res.json(results)
            }
        })
    })
