import { Injectable } from '@angular/core'
import * as faker from 'faker'
import { RxDocument } from 'rxdb'
import { Presentation, PresentationStats } from '../models/presentation'
import { Slide, SlideContent } from '../models/slide'
import { SlidesRepo } from '../repos/pages.repo'
import { PresentationsRepo } from '../repos/presentations.repo'

@Injectable()
export class PresentationsService {

  constructor (
    private pagesRepo: SlidesRepo,
    private presentationsRepo: PresentationsRepo
  ) { }

  async getImage (slide: Slide, item: SlideContent): Promise<any> {
    const attachment = await this.pagesRepo.getAttachment(slide.id, item.file)
    const blobBuffer = await attachment.getData()
    return new Promise(async (resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          const base64 = result.split(',')[1]
          const src = 'data:' + attachment.type + ';base64,' + base64
          resolve(src)
        }
        reader.readAsDataURL(new Blob([blobBuffer]))
      } catch (err) {
        reject()
      }
    })
  }

  async getStats (presentation: Presentation): Promise<PresentationStats> {
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

  async generateDemoData (size = 10) {
    console.log(`generate ${size} presentations`)

    for (let i = 0; i < 5; i++) {
      const p = await this.presentationsRepo.add({ title: faker.name.findName(), description: faker.lorem.paragraph() })
      console.log(`add presentation ${p}:${p.id}`)

      const rotation = faker.random.number({ min: 0, max: 1 }) === 1 ? '1024/768' : '768/1024'

      console.log(`generate ${size * 2} pages for ${p.id}`)
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
        // await this.createImagePage(p, pageData)
        // console.log(`add page ${c} to project ${p.id}`)
      }
    }
  }
}
