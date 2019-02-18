import { Component, OnInit } from '@angular/core'

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { ProjectsService } from '../../projects.service'

@Component({
  selector: 'projects-project-create',
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent implements OnInit {

  form: FormGroup

  constructor (
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService
  ) { }

  ngOnInit () {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    })
  }

  async onSubmit () {
    const formModel = this.form.value
    await this.projectsService
      .createProject(formModel.name)
    this.activeModal.close()
  }
}
