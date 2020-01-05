import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'
import { PROJECTS_SIDEBAR } from '../@shared/constants/sidebar'
import { ProjectsRepo } from '../@shared/repos/projects.repo'

@Component({
  selector: 'app-projects-shell',
  templateUrl: './shell.component.html'

})
export class ShellComponent implements OnInit {

  sidebar = PROJECTS_SIDEBAR

  constructor (
    private projectsRepo: ProjectsRepo
  ) { }

  async ngOnInit () {

    this.sidebar.marked = {
      data$: this.projectsRepo.all$(null, true).pipe(
        map((contacts) => {
          return contacts.map(p => {
            return {
              label: p.name,
              icon: ['far','bookmark'],
              url: ['/projects/projects', p._id]
            }
          })
        })
      )
    }
  }
}
