import * as _configuration from '../balance.config.json'
import * as _modules from '../modules/modules.json'

export const ENV: any = {
  production: false,
  configuration: _configuration,
  modules: _modules
}

export default ENV
