import cuid from 'cuid';
import { create } from 'ipfs';
import { createInstance } from 'orbit-db';
import { logger } from '../../commons/logger';


export class IpfsService {

  ipfs: any
  orbitdb: any;

  dbName = "default";

  db: any
  stats = {
    db: null,
    addrs: 0,
    peers: 0,
    logs: 0
  }

  async getStats() {
    const addrs = (await this.ipfs.swarm.addrs()).length
    const peers = (await this.ipfs.swarm.peers()).length
    const docs = this.db.iterator({ limit: -1 }).collect()
    return {
      addrs,
      peers,
      docs
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
    if (process.env.ORBIDDB_ADDRS) {
      this.db = await this.orbitdb.open(process.env.ORBIDDB_ADDRS)
    } else {
      this.db = await this.orbitdb.create(this.dbName, 'docstore', {
        accessController: {
          write: "*"
        },
        meta: { ciud: cuid() }
      })
    }
    logger.info(`db at ${this.db.address.toString()}`)
  }
}

