import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ContactType } from '../../_shared/models/contacts'
import { ContactsService } from '../../_shared/services/contacts.service'

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html'
})
export class ContactCreateComponent implements OnInit {

  form: FormGroup

  constructor (
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private contactsService: ContactsService
  ) { }

  ngOnInit () {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    })
  }

  async onSubmit () {
    const contact = await this.contactsService.addContact({
      name: this.form.value.name,
      type: ContactType.person,
      details: {},
      tags: []
    })
    this.activeModal.close(contact)
  }

}
