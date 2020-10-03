import dotenv from 'dotenv';
import { machineId, machineIdSync } from 'node-machine-id';
import os from 'os';
import { DbService } from "./modules/db";

let id = machineIdSync()

var dbService = new DbService()

async function start() {
    dotenv.config()
    await dbService.enableIpfs()
    await dbService.enableOrbitDB()
    await dbService.startDB()
    var id = await machineId()

    await dbService.clients.put(id, {
        lastJoin: Date.now(),
        os: `${os.type()} ${os.release()} ${os.platform()}`
    })

    setInterval(async () => {
        const stats = await dbService.getStats()
        console.log(stats)
    }, 10000)
}

start()