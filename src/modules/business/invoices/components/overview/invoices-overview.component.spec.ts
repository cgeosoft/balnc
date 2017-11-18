import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { InvoicesOverviewComponent } from './invoices-overview.component'

describe('InvoicesOverviewComponent', () => {
  let component: InvoicesOverviewComponent
  let fixture: ComponentFixture<InvoicesOverviewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesOverviewComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
