import ProjectSchema from '../schemas/project.json'
import PEventSchema from '../schemas/pevent.json'

export const ProjectsEntities = [{
  name: 'projects',
  schema: ProjectSchema,
  sync: true
}, {
  name: 'pevents',
  schema: PEventSchema,
  sync: true
}]
