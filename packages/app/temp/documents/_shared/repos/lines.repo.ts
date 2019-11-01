import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { RxDocument } from 'rxdb'
import { Line } from '../models/Line'

@Injectable()
export class LinesRepo extends Repository<Line> {

  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'line'
  }

  async addLine(document: string, index: number = 0) {
    const line: Partial<Line> = {
      data: {
        document,
        index,
        text: ''
      }
    }
    const lineDoc = await super.add(line.data)
    return lineDoc._id
  }

  async updateLine(line: Line, text) {
    const d = line as RxDocument<Line>
    await d.update({
      $set: {
        text,
        edited: Date.now()
      }
    })
  }

  async generateDemoData(document) {
    for (let k = 0; k < 20; k++) {
      await this.addLine(document)
    }
  }
}
