import { Component, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Page, RxPresentationDoc } from '../_shared/models/presentation'
import { PresentationsService } from '../_shared/services/presentations.service'

@Component({
  selector: 'app-presentations-add-page',
  templateUrl: './add-page.component.html'
})
export class AddPageComponent {

  @Input() presentation: RxPresentationDoc

  page: Page = {
    title: null,
    description: null,
    file: null,
    fileType: null
  }
  imagePreview: string
  imageInfo: any = {
    size: 0,
    width: 0,
    height: 0
  }

  constructor(
    public activeModal: NgbActiveModal,
    public presentationsService: PresentationsService
  ) { }

  loadFile(file): void {
    this.page.file = file
    const reader: FileReader = new FileReader()

    this.imageInfo.size = file.size

    reader.onloadend = (e) => {
      const img = new Image()
      img.onload = () => {
        this.imageInfo.width = img.width
        this.imageInfo.height = img.height
      }

      const src = reader.result as string
      img.src = src

      this.imagePreview = src
      const parts = src.split(',')
      const info = parts[0].split(';')
      this.page.fileType = info[0].replace('data:', '')
    }
    reader.readAsDataURL(this.page.file)
  }

  async create() {
    await this.presentationsService.createPage(this.presentation, this.page)
    this.activeModal.close(this.page)
  }
}
