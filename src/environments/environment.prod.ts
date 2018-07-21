// import * as _modules from '../../../modules/modules.json'
import * as _package from '../../package.json'

export const environment: any = {
  isProd: true,
  modules: {}, //_modules["modules"],
  version: _package["version"],
}

export default environment
