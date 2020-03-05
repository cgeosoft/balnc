import { Enviroment } from '@balnc/shared'
import * as pkg from '../../package.json'
import * as build from '../assets/build.json'
import { plugins } from './plugins'

export const environment: Enviroment = {
  production: false,
  plugins: plugins,
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
