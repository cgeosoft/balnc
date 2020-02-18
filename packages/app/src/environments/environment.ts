import { Enviroment } from '@balnc/shared'
import * as pkg from '../../package.json'
import * as build from '../assets/build.json'
import * as plugins from './plugins.json'

export const environment: Enviroment = {
  production: false,
  plugins: plugins['default'],
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
