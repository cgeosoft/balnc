import dotenv from 'dotenv';
import { machineId } from 'node-machine-id';
import os from 'os';
import { logger } from './commons/logger';
import { DbService } from "./modules/db";

var dbService = new DbService()

async function start() {
    logger.info("start")
    dotenv.config()

    await dbService.enableIpfs()
    await dbService.enableOrbitDB()
    await dbService.startDB()

    var id = await machineId()

    await dbService.clients.put(id, {
        lastJoin: Date.now(),
        os: `${os.platform()} ${os.release()}`
    })
}

start()

setInterval(async () => {
    const stats = await dbService.getStats()
    logger.info("stats", stats)
}, 10000)