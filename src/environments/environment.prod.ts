import * as _configuration from '../balance.config.json'
import * as _modules from '../modules/modules.json'

export const ENV: any = {
  production: true,
  configuration: _configuration,
  modules: _modules
}

export default ENV
