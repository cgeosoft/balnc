import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesShellComponent } from './notes-shell.component';

describe('NotesShellComponent', () => {
  let component: NotesShellComponent;
  let fixture: ComponentFixture<NotesShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
