import { Entity } from '@balnc/common'

import { ProjectSchema } from './models/project'
import { LogSchema } from './models/log'

export const ProjectsEntities: Entity[] = [{
  name: 'project',
  schema: ProjectSchema,
  sync: true
}, {
  name: 'log',
  schema: LogSchema,
  sync: true
}]
