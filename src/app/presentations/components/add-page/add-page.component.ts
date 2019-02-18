import { Component, Input } from '@angular/core';
import { HelperService } from '@balnc/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PresentationDoc } from '../../models/presentation';

@Component({
  selector: 'presentations-add-page',
  templateUrl: './add-page.component.html'
})
export class AddPageComponent {

  @Input() presentation: PresentationDoc

  page: any = {
    title: null,
    description: null,
    file: null,
    blob: null,
    fileType: null
  }
  imagePreview: string
  imageInfo: any = {
    size: 0,
    width: 0,
    height: 0
  }

  constructor(public activeModal: NgbActiveModal) { }

  async onSubmit() {

    const pageKey = HelperService.uid()

    await this.presentation.putAttachment({
      id: `file-${pageKey}`,
      data: this.page.file,
      type: this.page.fileType
    })

    await this.presentation.update({
      $push: {
        pages: {
          key: pageKey,
          title: this.page.title || `Page ${pageKey}`,
          description: this.page.description,
          type: 'BGIMG',
          params: {
            image: `file-${pageKey}`
          }
        }
      },
      $set: {
        dateUpdated: Date.now()
      }
    })

    this.activeModal.close(this.page)
  }

  loadFile($event): void {
    this.page.file = $event.target.files[0]
    const reader: FileReader = new FileReader()

    this.imageInfo.size = this.page.file.size

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
      // this.page.blob = parts[1]
      this.page.fileType = info[0].replace('data:', '')
    }
    reader.readAsDataURL(this.page.file)
  }
}
