import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndrawComponent } from './undraw.component';

describe('UndrawComponent', () => {
  let component: UndrawComponent;
  let fixture: ComponentFixture<UndrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
