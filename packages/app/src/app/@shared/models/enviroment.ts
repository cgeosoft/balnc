import { EnvBuild } from './env-build'
import { Module } from './module'

export interface Enviroment {
  production: boolean
  modules: Module[]
  build: EnvBuild
  version: string
  servers: any[]
}
