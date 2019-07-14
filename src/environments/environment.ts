import * as _package from '../../package.json';
import * as _plugins from './plugins.json';

export const environment = {
  production: false,
  plugins: _plugins['plugins'],
  version: _package['version'],
  funcs: 'http://localhost:4300/.netlify/functions',
  db: 'http://localhost:5984'
}

export default environment
