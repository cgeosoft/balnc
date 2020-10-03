import { IpfsService } from "./modules/ipfs/IpfsService"
let db
var ipfs = new IpfsService()
ipfs
    .activate()
    .then(() => {

        // db = ipfs.db

        // db.events.on('write', (address, entry, heads) => {
        //     const logs = db.iterator({ limit: -1 })
        //         .collect()
        //         .map((e) => e.payload.value)
        //     console.log("logs", {
        //         total: logs.length
        //     })
        // })

        // setInterval(() => {
        //     db.add({ "ts": Date.now() })
        // }, 10000)

        // setInterval(() => {
        //     console.log({
        //         swarm: ipfs.swarm.addrs().length
        //     })
        // }, 5000)
    })
