import { config } from 'dotenv'
import { IpfsService } from "./modules/ipfs/IpfsService"

var ipfs = new IpfsService()

async function start() {
    config()
    await ipfs.enableIpfs()
    await ipfs.enableOrbitDB()
    await ipfs.startDB()
}

start()