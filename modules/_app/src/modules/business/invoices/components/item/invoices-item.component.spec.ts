import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { InvoicesItemComponent } from './invoices-item.component'

describe('InvoicesItemComponent', () => {
  let component: InvoicesItemComponent
  let fixture: ComponentFixture<InvoicesItemComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesItemComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
