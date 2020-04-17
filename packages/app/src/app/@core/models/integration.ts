import { Entity } from '@balnc/core';

export interface Integration extends Entity {
  enabled: boolean
}

export interface GiphyIntegration extends Integration {
  apiKey: string
}

export interface ServerIntegration extends Integration {
  host: string
  dbEnable?: boolean
  dbName?: string
  dbHost?: string
}
