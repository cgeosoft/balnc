import * as _packages from './packages.json'
import * as _package from '../../package.json'

const packages = _packages['packages']
const version = _package['version']

export const environment = {
  production: false,
  packages: packages,
  version: version
}

export default environment
