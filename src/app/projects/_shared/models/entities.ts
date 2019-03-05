import PEventSchema from '../schemas/pevent.json';
import ProjectSchema from '../schemas/project.json';

export const ProjectsEntities = [{
  name: 'projects',
  schema: ProjectSchema,
  sync: true
}, {
  name: 'pevents',
  schema: PEventSchema,
  sync: true
}]
