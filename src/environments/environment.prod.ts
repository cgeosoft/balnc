import * as _modules from '../modules/modules.json'
import * as _package from '../../package.json'

export const ENV: any = {
  production: true,
  modules: _modules,
  package: _package,
}

export default ENV
