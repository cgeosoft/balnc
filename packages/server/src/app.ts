import dotenv from 'dotenv';
import { machineId } from 'node-machine-id';
import os from 'os';
import { DbService } from "./modules/db";

var dbService = new DbService()

async function start() {
    dotenv.config()
    
    await dbService.enableIpfs()
    await dbService.enableOrbitDB()
    await dbService.startDB()
    
    var id = await machineId()

    await dbService.clients.put(id, {
        lastJoin: Date.now(),
        os: `${os.platform()} ${os.release()}`
    })

    setInterval(async () => {
        const stats = await dbService.getStats()
        console.log(stats)
    }, 10000)
}

start()