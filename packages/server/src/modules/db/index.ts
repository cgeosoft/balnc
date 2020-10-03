import cuid from 'cuid';
import { create } from 'ipfs';
import { createInstance } from 'orbit-db';
import { logger } from '../../commons/logger';

export class DbService {

  ipfs: any
  orbitdb: any;

  clients

  stats = {
    db: null,
    addrs: 0,
    peers: 0,
    logs: 0
  }

  async getStats() {
    const addrs = (await this.ipfs.swarm.addrs()).length
    const peers = (await this.ipfs.swarm.peers()).length
    const clients = this.clients.all
    return {
      addrs,
      peers,
      clients
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
      this.clients = await this.orbitdb.open(`/orbit/${process.env.ORBIDDB_CID}/clients`)
    } else {
      this.clients = await this.orbitdb.create('clients', 'keyvalue', {
        accessController: {
          write: "*"
        },
        meta: { ciud: cuid() }
      })
    }
    logger.info(`clients at ${this.clients.address.toString()}`)
  }
}

