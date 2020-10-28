import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { machineId } from 'node-machine-id';
import os from 'os';
import { logger } from './commons/logger';
import { DocType } from './DocType';
import { DbService } from "./modules/db";

var dbService = new DbService()

async function showStats() {
    const stats = await dbService.getStats()
    logger.info("stats", stats)
    
    const nodes = dbService.db.query((doc) => doc.type === DocType.Node)
    nodes.sort((a, b) => a.ts < b.ts)
    writeFileSync("nodes.json", JSON.stringify(nodes, null, 2))

    const messages = dbService.db.query((doc) => doc.type === DocType.Message)
    messages.sort((a, b) => a.ts < b.ts)
    writeFileSync("messages.json", JSON.stringify(messages, null, 2))
}

async function start() {
    logger.info("start")
    dotenv.config()

    await dbService.enableIpfs()
    await dbService.enableOrbitDB()
    await dbService.startDB()

    var mid = await machineId()

    await dbService.db.put({
        _id: `com.balnc.node:${mid}`,
        type: DocType.Node,
        ts: Date.now(),
        os: `${os.platform()} ${os.release()}`
    })

    // setInterval(async () => {
    //     await dbService.db.put({
    //         _id: `com.balnc.message:${cuid()}`,
    //         creator: mid,
    //         type: DocType.Message,
    //         ts: Date.now(),
    //         text: faker.hacker.phrase()
    //     })
    // }, 10 * 1000)

    setInterval(showStats, 5 * 1000)

    await showStats()
}

start()