import ProjectSchema from './project.json'
import LogSchema from './log.json'

export const ProjectsEntities = [{
  name: 'project',
  schema: ProjectSchema,
  sync: true
}, {
  name: 'log',
  schema: LogSchema,
  sync: true
}]
