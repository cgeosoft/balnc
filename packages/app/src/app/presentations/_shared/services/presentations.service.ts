import { Injectable } from '@angular/core'
import { Helpers } from '@balnc/shared'
import * as faker from 'faker'
import { RxDocument } from 'rxdb'
import { Page } from '../models/page'
import { Presentation, PresentationStats } from '../models/presentation'
import { PagesRepo } from '../repos/pages.repo'
import { PresentationsRepo } from '../repos/presentations.repo'

@Injectable()
export class PresentationsService {

  constructor(
    private pagesRepo: PagesRepo,
    private presentationsRepo: PresentationsRepo
  ) { }

  async getPresentations(params?: any) {
    params = params || {}
    let _presentations = await this.presentationsRepo.all()

    const images = await Promise.all(_presentations.map((p) => this.getThumb(p)))

    const stats = await Promise.all(_presentations.map((p) => this.getStats(p)))

    const presentations2 = _presentations.map((presentation, index) => {
      const p: any = presentation
      p.thumb = images[index]
      p.stats = stats[index]
      return p
    })
    return presentations2
  }

  async getThumb(presentation: Presentation): Promise<any> {
    if (!presentation.pages || presentation.pages.length === 0) {
      return
    }
    const image = presentation.pages[0].params.image
    return this.getImage((presentation as RxDocument<Presentation>), image)
  }

  async getImage(presentation: Presentation, contentImage: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const attachment = (presentation as RxDocument<Presentation>).getAttachment(contentImage)
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

  async getStats(presentation: Presentation): Promise<PresentationStats> {
    const p = presentation as RxDocument<Presentation>
    if (!p.get('_attachments')) {
      return {
        filecount: 0,
        filesize: 0
      }
    }
    const attachments = p.allAttachments()
    const filesize = attachments.reduce((t, i) => {
      return t + i.length
    }, 0)

    return {
      filecount: attachments.length,
      filesize: filesize
    }
  }

  async createPage(presentation: Presentation, page: Page) {
    const p = presentation as RxDocument<Presentation>
    const pageKey = Helpers.uid()

    await p.putAttachment({
      id: `file-${pageKey}`,
      data: page.file,
      type: page.fileType
    })

    await p.update({
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

    for (let i = 0; i < 5; i++) {
      const p = await this.presentationsRepo.add({ title: faker.name.findName(), description: faker.lorem.paragraph() })
      console.log(`add presentation ${p}:${p._id}`)

      const rotation = faker.random.number({ min: 0, max: 1 }) === 1 ? '1024/768' : '768/1024'

      console.log(`generate ${size * 2} pages for ${p._id}`)
      for (let c = 0; c < size * 2; c++) {
        const image = `https://picsum.photos/id/${faker.random.number({ min: 1000, max: 1017 })}/${rotation}`

        const filedata = await fetch(image)
          .then(res => res.blob())
        const pageData = {
          title: faker.name.findName(),
          description: faker.lorem.paragraph(),
          file: filedata,
          fileType: 'image/png'
        }
        await this.createPage(p, pageData)
        console.log(`add page ${c} to project ${p._id}`)
      }
    }
  }
}
