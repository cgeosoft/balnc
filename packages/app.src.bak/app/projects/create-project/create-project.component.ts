import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ProjectsRepo } from '../@shared/repos/projects.repo'

@Component({
  selector: 'app-projects-project-create',
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent implements OnInit {

  form: FormGroup

  constructor (
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsRepo
  ) { }

  ngOnInit () {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    })
  }

  async onSubmit () {
    const formModel = this.form.value
    const projectId = await this.projectsService.add({ name: formModel.name })
    this.activeModal.close(projectId)
  }
}
