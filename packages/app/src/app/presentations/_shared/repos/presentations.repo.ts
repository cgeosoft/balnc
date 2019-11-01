import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import * as faker from 'faker'
import { Presentation } from '../models/presentation'

@Injectable()
export class PresentationsRepo extends Repository<Presentation> {

  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'presentations.presentation'
  }

  async generateDemoData(size = 10) {
    console.log(`generate ${size} presentations`)

    for (let p = 0; p < 5; p++) {
      const presentation = await this.add({ name: faker.name.findName(), description: faker.lorem.paragraph() })
      console.log(`add presentation ${presentation}:${presentation.get('_id')}`)

      const rotation = faker.random.number({ min: 0, max: 1 }) === 1 ? '1024/768' : '768/1024'

      console.log(`generate ${size * 2} pages for ${presentation.get('_id')}`)
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
        await this.createPage(presentation, pageData)
        console.log(`add page ${c} to project ${presentation.get('_id')}`)
      }
    }
  }
}
