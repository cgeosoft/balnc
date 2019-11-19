import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import * as faker from 'faker'
import { Document } from '../models/document'

@Injectable()
export class DocumentsRepo extends Repository<Document> {

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'documents.document'
  }

  async generateDemoData () {
    const documents: string[] = []
    for (let i = 0; i < 3; i++) {
      const d: Partial<Document> = {
        name: faker.commerce.productName()
      }
      let p = await super.add(d, null, faker.date.past().getTime())
      documents.push(p._id)
    }
  }
}
