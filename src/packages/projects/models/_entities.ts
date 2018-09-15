import ProjectSchema from './project.json'
import LogSchema from './plog.json'

export const ProjectsEntities = [{
  name: 'projects',
  schema: ProjectSchema,
  sync: true
}, {
  name: 'plogs',
  schema: LogSchema,
  sync: true
}]
