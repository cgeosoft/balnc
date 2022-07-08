import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ContactType } from '../@shared/contacts'
import { ContactsRepo } from '../@shared/contacts.repo'

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html'
})
export class ContactCreateComponent implements OnInit {

  form: FormGroup

  constructor (
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private contactsService: ContactsRepo
  ) { }

  ngOnInit () {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    })
  }

  async onSubmit () {
    const contact = await this.contactsService.add({
      name: this.form.value.name,
      type: ContactType.person
    })
    this.activeModal.close(contact)
  }

}
