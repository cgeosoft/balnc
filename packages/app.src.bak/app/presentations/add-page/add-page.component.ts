import { Component, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Presentation } from '../@shared/models/presentation'

@Component({
  selector: 'app-presentations-add-page',
  templateUrl: './add-page.component.html'
})
export class AddPageComponent {

  @Input() presentation: Presentation

  preview: string
  info: any = {
    width: 0,
    height: 0
  }
  file: File

  constructor (
    public activeModal: NgbActiveModal
  ) { }

  loadFile (file: File): void {
    this.file = file

    const reader: FileReader = new FileReader()

    reader.onloadend = (e) => {
      const img = new Image()
      img.onload = () => {
        this.info.width = img.width
        this.info.height = img.height
      }

      const src = reader.result as string
      img.src = src

      this.preview = src
      const parts = src.split(',')
      const info = parts[0].split(';')
    }
    reader.readAsDataURL(this.file)
  }

  async create () {
    this.activeModal.close(this.file)
  }
}
