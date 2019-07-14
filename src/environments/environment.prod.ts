import * as _package from '../../package.json';
import * as _plugins from './plugins.json';

export const environment = {
  production: false,
  plugins: _plugins['plugins'],
  version: _package['version'],
  funcs: '/.netlify/functions',
  db: 'https://db.cgeosoft.com'
}

export default environment
