import { Pipe, PipeTransform } from '@angular/core'
import { Issue } from '../models/all'
@Pipe({ name: 'filterIssues', pure: false })
export class FilterIssuesPipe implements PipeTransform {
  transform (issues: Issue[], filters?: any): Issue[] {
    return issues.filter((i) => i.status === filters.status || filters.status === null)
  }
}
