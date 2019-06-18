import IssueSchema from '../schemas/issue.json';
import LogSchema from '../schemas/log.json';
import ProjectSchema from '../schemas/project.json';

export const ProjectsEntities = [{
  name: 'projects',
  schema: ProjectSchema,
  sync: true
}, {
  name: 'issues',
  schema: IssueSchema,
  sync: true
}, {
  name: 'logs',
  schema: LogSchema,
  sync: true
}]
