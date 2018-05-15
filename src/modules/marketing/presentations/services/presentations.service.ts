import { Subject } from "rxjs/Subject"
import { RxCollection, RxReplicationState, RxDocumentBase } from "rxdb"
import { Observable, } from "rxjs/Observable"
import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router"

import * as _ from 'lodash'
import * as moment from 'moment'

import { PresentationSchema, RxPresentationDocument } from "@balnc/marketing/presentations/data/presentation"
import { DatabaseService } from "@balnc/common/services/database.service";
import { Entity } from "@balnc/common/models/entity";

const entities: Entity[] = [{
  name: 'presentation',
  schema: PresentationSchema,
  sync: true,
}]

@Injectable()
export class PresentationsService implements Resolve<any> {

  presentations: RxCollection<RxPresentationDocument>

  constructor(
    private dbService: DatabaseService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
    return this.setup()
  }

  async setup() {
    await this.dbService.load(entities)
    this.presentations = await this.dbService.get<RxPresentationDocument>("presentation")
  }

  async getPresentations(params?: any) {
    console.log("presentations")
    const presentations = await this.presentations.find().exec()
    const images$ = presentations
      .map(async (presentation) => {
        return await this.getThumb(presentation)
      })
    const images = await Promise.all(images$)

    const stats$ = presentations
      .map(async (presentation) => {
        return await this.getStats(presentation)
      })
    const stats = await Promise.all(stats$)

    const presentations2 = presentations
      .map((presentation, index) => {
        const p: any = presentation
        p.thumb = images[index]
        p.stats = stats[index]
        return p
      })
    return presentations2
  }

  async getPresentation(presentationId): Promise<RxPresentationDocument & any> {
    const presentation: RxPresentationDocument & any = await this.presentations.findOne(presentationId).exec()
    presentation.pages = presentation.pages || []
    presentation.stats = await this.getStats(presentation)
    return presentation
  }

  async addPresentation(title: string, description?: string) {
    const result = await this.presentations
      .newDocument({
        title: title,
        description: description,
        pages: []
      })
      .save()
    return result
  }

  async getThumb(presentation: RxPresentationDocument): Promise<any> {

    if (!presentation.pages || presentation.pages.length === 0) {
      return
    }
    const image = presentation.pages[0].params.image
    return await this.getImage(presentation, image)

  }

  async getImage(presentation: RxPresentationDocument, contentImage: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const attachment = await presentation.getAttachment(contentImage)
      const blobBuffer = await attachment.getData()
      try {
        const reader = new FileReader()
        reader.onload = () => {
          const base64 = reader.result.split(',')[1]
          const src = 'data:' + attachment.type + ';base64,' + base64
          resolve(src)
        }
        reader.readAsDataURL(blobBuffer)
      } catch (err) {
        reject()
      }
    })
  }

  async getStats(presentation: RxPresentationDocument) {
    if (!presentation.get("_attachments")) {
      return {
        filecount: 0,
        filesize: 0,
      }
    }
    const attachments = await presentation.allAttachments()
    const filesize = attachments.reduce((t, i) => {
      return t + i.length
    }, 0)

    return {
      filecount: attachments.length,
      filesize: filesize,
    }
  }
}
