import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { RxDocument } from 'rxdb'
import { Line } from './line'

@Injectable()
export class LinesRepo extends Repository<Line> {

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'documents.line'
  }

  async addLine (document: string, index: number = 0) {
    const line: Partial<Line> = {
      document,
      index,
      text: ''
    }
    const lineDoc = await super.add(line)
    return lineDoc._id
  }

  async updateLine (line: Line, text) {
    const d = line as RxDocument<Line>
    await d.update({
      $set: {
        text,
        edited: Date.now()
      }
    })
  }

  async generateDemoData (document) {
    for (let k = 0; k < 20; k++) {
      await this.addLine(document)
    }
  }
}
