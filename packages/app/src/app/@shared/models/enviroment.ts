import { EnvBuild } from './env-build';

export interface Enviroment {
  production: boolean
  build: EnvBuild
  version: string
  sentry: { dsn: string, showReportDialog: boolean }
  servers: any[]
}
