import { Injectable, NgZone } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { ConfigService, RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import * as faker from 'faker'
import { Observable } from 'rxjs'
import { Document, entities, Line, RxDocumentDoc, RxLineDoc } from './models/entities'

@Injectable()
export class DocumentsService extends CommonService implements Resolve<void> {

  documents$: Observable<RxDocumentDoc[]>
  lines$: Observable<RxLineDoc[]>

  constructor (
    zone: NgZone,
    dbService: RxDBService,
    private config: ConfigService
  ) {
    super(zone, dbService)
  }

  async resolve (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    await this.setup()
  }

  async setup () {
    await super.setup({
      alias: 'documents',
      entities: entities
    })
    this.documents$ = this.db['documents'].find().$
  }

  async createDocument (name: string) {
    const documents: Document = {
      name,
      created: Date.now()
    }
    const documentsDoc = await super.addOne('documents', documents)
    return documentsDoc['_id']
  }

  async addLine (document: string, index: number = Infinity) {
    const documents: Line = {
      document,
      index,
      text: '',
      edited: Date.now()
    }
    const documentsDoc = await super.addOne('documents', documents)
    return documentsDoc['_id']
  }

  async generateDemoData () {
    const documents: string[] = []
    for (let i = 0; i < 3; i++) {
      const document: Document = {
        name: faker.commerce.productName(),
        created: faker.date.past().getTime()
      }
      let p = await super.addOne('documents', document)
      documents.push(p.get('_id'))
    }

    for (let k = 0; k < 20; k++) {
      const pr = Math.floor(Math.random() * documents.length)
      const id = await this.addLine(documents[pr])
    }
  }
}
