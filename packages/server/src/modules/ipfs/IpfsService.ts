import { create } from 'ipfs';
import { createInstance } from 'orbit-db';


export class IpfsService {
  testDb = "/orbitdb/QmXhCEYKY3xT24J3JGBz92HFPKMvNeCnLbygQ9pGT5XhWv/test"
  ipfs: any
  db: any

  stats = {
    db: null,
    addrs: 0,
    peers: 0,
    logs: 0
  }

  async logStats() {

    this.stats.addrs = (await this.ipfs.swarm.addrs()).length
    this.stats.peers = (await this.ipfs.swarm.peers()).length

    console.log("stats", this.stats)
  }

  async activate() {
    this.ipfs = await create({
      repo: './data/ipfs',
      libp2p: {
        config: {
          dht: {
            enabled: true
          }
        }
      }
    })
    // const config = await this.ipfs.config.getAll()
    // console.log()

    try {
      const orbitdb = await createInstance(this.ipfs, {
        directory: './data/orbitdb'
      })

      // this.db = await orbitdb.eventlog('hello3', {
      //   overwrite: true
      // })

      this.db = await orbitdb.open("/orbitdb/zdpuAvz7ZfdjkRWfShXro7hQG9XD2qNDEzN9YsTSLsB2C6ZPi/hello3")
      
      console.log("address", this.db.address.toString())

      // this.db = await orbitdb.open("hi", { create: true,type:"eventlog" })

      // const identity = await this.ipfs.id()
      // console.log(`/orbitdb/${orbitdb.identity.id}/hello2`)
      // console.log(`/orbitdb/${identity.id}/hello2`)

      this.db.events.on('write', (address, entry, heads) => {
        this.stats.logs = this.db.iterator({ limit: -1 }).collect().length
      })
      await this.db.load()

    } catch (e) {
      console.error(e)
    }

    setInterval(async () => {
      await this.logStats()
    }, 10000)

    setInterval(async () => {
      await this.db.add({ ts: Date.now() })
    }, 15000)

  }
}

