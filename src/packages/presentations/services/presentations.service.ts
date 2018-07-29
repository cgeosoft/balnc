import { Injectable } from '@angular/core'
import { RxCollection } from 'rxdb'

import { DatabaseService } from '@balnc/common'
import { Presentation } from '../models/presentation'

@Injectable()
export class PresentationsService {

  presentations: RxCollection<Presentation>

  constructor (
    private dbService: DatabaseService
  ) {
    this.setup()
  }

  async setup () {
    this.presentations = await this.dbService.get<Presentation>('presentation')
  }

  async getPresentations (params?: any) {
    params = params || {}
    let _presentations = await this.presentations.find(params).exec()
    const images$ = _presentations
      .map(async (presentation) => {
        return this.getThumb(presentation)
      })
    const images = await Promise.all(images$)

    const stats$ = _presentations
      .map(async (presentation) => {
        return this.getStats(presentation)
      })
    const stats = await Promise.all(stats$)

    const presentations2 = _presentations
      .map((presentation, index) => {
        const p: any = presentation
        p.thumb = images[index]
        p.stats = stats[index]
        return p
      })
    return presentations2
  }

  async getPresentation (presentationId): Promise<Presentation & any> {
    const presentation: Presentation & any = await this.presentations.findOne(presentationId).exec()
    presentation.pages = presentation.pages || []
    presentation.stats = await this.getStats(presentation)
    return presentation
  }

  async addPresentation (title: string, description?: string) {
    const presentation = this.presentations
      .newDocument({
        title: title,
        description: description,
        pages: []
      })

    await presentation.save()
  }

  async getThumb (presentation: Presentation): Promise<any> {

    if (!presentation.pages || presentation.pages.length === 0) {
      return
    }
    const image = presentation.pages[0].params.image
    return this.getImage(presentation, image)

  }

  async getImage (presentation: Presentation, contentImage: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const attachment = await presentation.getAttachment(contentImage)
      const blobBuffer = await attachment.getData()
      try {
        const reader = new FileReader()
        reader.onload = () => {
          const base64 = reader.result.split(',')[1]
          const src = 'data:' + attachment.type + ';base64,' + base64
          resolve(src)
        }
        reader.readAsDataURL(blobBuffer)
      } catch (err) {
        reject()
      }
    })
  }

  async getStats (presentation: Presentation) {
    if (!presentation.get('_attachments')) {
      return {
        filecount: 0,
        filesize: 0
      }
    }
    const attachments = await presentation.allAttachments()
    const filesize = attachments.reduce((t, i) => {
      return t + i.length
    }, 0)

    return {
      filecount: attachments.length,
      filesize: filesize
    }
  }
}
