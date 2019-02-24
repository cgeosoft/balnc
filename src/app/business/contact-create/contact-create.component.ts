import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactLogType } from '../_shared/models/_all';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
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
      details: {},
      tags: ['person'],
      logs: [{
        date: new Date(),
        type: ContactLogType.Create
      }]
    })
    this.activeModal.close(contact)
  }

}
