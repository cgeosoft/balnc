import { Enviroment } from '@balnc/shared'
import * as pkg from '../../package.json'
import * as build from '../assets/build.json'
import { modules } from './modules'

export const environment: Enviroment = {
  production: true,
  modules: modules,
  build: build['default'],
  version: pkg['version'],
  servers: [
    {
      label: 'Demo Server',
      url: 'http://localhost:3000/api'
    }
  ]
}

export default environment
