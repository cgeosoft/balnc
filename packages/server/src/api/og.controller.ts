import express from 'express';
///<reference path="../typings/open-graph-scraper.d.ts"/>
import ogs from 'open-graph-scraper';
import { logger } from '../commons/logger';
import { sendBadRequest } from '../commons/response';

export const ogCtrl = express.Router();

ogCtrl.route("/")
    .get((req: any, res: any, next: any) => {
        logger.info("parse url", req.query.q)
        if (!req.query.q) return sendBadRequest(res, "no url")
        ogs({ url: req.query.q }, (error: any, results: any) => {
            if (error) {
                next(error) // Pass errors to Express.
            } else {
                res.json(results)
            }
        })
    })
