import * as _modules from '../modules/modules.json'
import * as _package from '../../package.json'

export const ENV: any = {
  production: false,
  modules: _modules["modules"],
  version: _package["version"],
}

export default ENV
