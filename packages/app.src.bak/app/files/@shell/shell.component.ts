import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-shell',
  template: `<app-page>
  <app-empty undraw="under-construction" submessage="under construction" message="files"></app-empty>
</app-page>
`,
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor () { }

  ngOnInit (): void {
  }

}
