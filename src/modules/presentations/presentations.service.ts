import { Injectable } from '@angular/core'
import { RxCollection } from 'rxdb'

import { Presentation } from './models/presentation'
import { PresentationsEntities } from './models/_entities'
import { RxDBService, CommonService } from '@balnc/common'

@Injectable()
export class PresentationsService extends CommonService {

  alias = 'presentations'
  entities = PresentationsEntities

  async getPresentations (params?: any) {
    params = params || {}
    let _presentations = await super.getAll<Presentation>('presentations', params)
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
    const presentation: Presentation & any = await super.getOne<Presentation>('presentations', presentationId)
    presentation.pages = presentation.pages || []
    presentation.stats = await this.getStats(presentation)
    return presentation
  }

  async addPresentation (title: string, description?: string) {
    await super.addOne('presentations', {
      title: title,
      description: description,
      pages: []
    })
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
          const result = reader.result as string
          const base64 = result.split(',')[1]
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
