import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotesShellComponent } from './notes-shell/notes-shell.component'
import { NoteComponent } from './note/note.component'
import { SharedModule } from '@balnc/shared'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    NotesShellComponent,
    NoteComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: NotesShellComponent,
      children: [
        { path: ':id', component: NoteComponent }
      ]
    }])
  ]
})
export class NotesModule { }
