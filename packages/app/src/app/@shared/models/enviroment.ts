import { EnvBuild } from './env-build'

export interface Enviroment {
  production: boolean
  build: EnvBuild
  version: string
  servers: any[]
}
