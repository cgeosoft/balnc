import * as _bmodules from './bmodules.json'
import * as _package from '../../package.json'

export const environment = {
  production: false,
  bmodules: _bmodules['bmodules'],
  version: _package['version']
}

export default environment
