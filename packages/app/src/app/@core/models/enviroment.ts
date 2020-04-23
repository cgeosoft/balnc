import { Build } from './build';

export interface Enviroment {
  production: boolean
  build: Build
  version: string
  sentry: { dsn: string, showReportDialog: boolean }
  servers: any[]
}
