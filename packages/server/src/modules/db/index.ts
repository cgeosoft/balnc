import { create } from 'ipfs';
import { createInstance } from 'orbit-db';
import { logger } from '../../commons/logger';

export class DbService {

  ipfs: any
  orbitdb: any

  db: any
  messages: any

  stats = {
    addrs: 0,
    peers: 0,
    logs: 0
  }

  async getStats() {

    const addrs = (await this.ipfs.swarm.addrs()).length
    const peers = (await this.ipfs.swarm.peers()).length

    const messages = this.db.all

    return {
      addrs,
      peers,
      docsCount: messages.length
    }
  }

  async enableIpfs() {
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
    logger.info("ipfs started")
  }

  async enableOrbitDB() {
    this.orbitdb = await createInstance(this.ipfs, {
      directory: './data/orbitdb'
    })
    logger.info("orbitdb started")
  }

  async startDB() {

    this.db = await this.orbitdb
      .docs('db', {
        accessController: {
          write: "*"
        }
      })

    // this.db = await this.orbitdb.open("/orbitdb/zdpuAvxNYLBrXtz67pJfto2u7CZQCFrHUm4STbkt6VUmtpJkT/db", {
    //   create: true
    // })

    await this.db.load()

    logger.info(`database at ${this.db.address.toString()}`)

  }
}
