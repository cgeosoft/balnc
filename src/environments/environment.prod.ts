import * as _packages from './packages.json'
import * as _package from '../../package.json'

export const environment = {
  production: false,
  packages: _packages['packages'],
  version: _package['version']
}

export default environment
