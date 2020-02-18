import { EnvBuild } from './env-build';
import { BPlugin } from './plugin';

export interface Enviroment {
  production: boolean;
  plugins: BPlugin[];
  build: EnvBuild;
  version: string;
  servers: any[];
}
