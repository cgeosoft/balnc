import { Injectable, NgZone } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { CommonService, Helpers } from '@balnc/shared'
import * as faker from 'faker'
import { Page, Presentation, PresentationStats, RxPresentationDoc } from '../models/presentation'
import { PresentationsEntities } from '../models/_entities'

@Injectable()
export class PresentationsService extends CommonService {

  constructor(
    zone: NgZone,
    dbService: RxDBService
  ) {
    super(zone, dbService)
  }

  async setup() {
    await super.setup({
      alias: 'presentations',
      entities: PresentationsEntities
    })
  }

  async getPresentations(params?: any) {
    params = params || {}
    let _presentations = await super.getAll<RxPresentationDoc>('presentations', params)
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

  async getPresentation(id): Promise<RxPresentationDoc> {
    return super.getOne<RxPresentationDoc>('presentations', id)
  }

  async createPresentation(title: string, description?: string) {
    return super.addOne<Presentation>('presentations', {
      title: title,
      description: description,
      pages: [],
      dateCreated: Date.now()
    })
  }

  async getThumb(presentation: RxPresentationDoc): Promise<any> {

    if (!presentation.pages || presentation.pages.length === 0) {
      return
    }
    const image = presentation.pages[0].params.image
    return this.getImage(presentation, image)

  }

  async getImage(presentation: RxPresentationDoc, contentImage: string): Promise<any> {
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

  async getStats(presentation: RxPresentationDoc): Promise<PresentationStats> {
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

  async createPage(presentation: RxPresentationDoc, page: Page) {
    const pageKey = Helpers.uid()

    await presentation.putAttachment({
      id: `file-${pageKey}`,
      data: page.file,
      type: page.fileType
    })

    await presentation.update({
      $push: {
        pages: {
          key: pageKey,
          title: page.title || `Page ${pageKey}`,
          description: page.description,
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
  }

  async generateDemoData(size = 10) {
    console.log(`generate ${size} presentations`)

    for (let p = 0; p < 5; p++) {
      const p = await this.createPresentation(faker.name.findName(), faker.lorem.paragraph())
      console.log(`add presentation ${p}:${p.get('_id')}`)

      const rotation = faker.random.number({ min: 0, max: 1 }) === 1 ? '1024/768' : '768/1024'

      console.log(`generate ${size * 5} pages for ${p.get('_id')}`)
      for (let c = 0; c < 15; c++) {
        const image = `https://picsum.photos/id/${faker.random.number({ min: 1000, max: 1017 })}/${rotation}`

        const filedata = await fetch(image)
          .then(res => res.blob())
        const pageData = {
          title: faker.name.findName(),
          description: faker.lorem.paragraph(),
          file: filedata,
          fileType: 'image/png'
        }
        const page = await this.createPage(p, pageData)
        console.log(`add page ${c}:${p.get('_id')} to project ${p.get('_id')}`)
      }
    }
  }
}
