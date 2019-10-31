import { Injectable } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { Repository } from '@balnc/shared'
import * as faker from 'faker'
import { Document } from '../models/Document'

@Injectable()
export class DocumentsRepo extends Repository<Document> {

  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'document'
  }

  async generateDemoData() {
    const documents: string[] = []
    for (let i = 0; i < 3; i++) {
      const d: Partial<Document> = {
        data: { name: faker.commerce.productName() }
      }
      let p = await super.add(d.data, faker.date.past().getTime())
      documents.push(p._id)
    }
  }
}
