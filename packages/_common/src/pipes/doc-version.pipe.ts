import { Pipe, PipeTransform } from '@angular/core'
import * as moment_ from "moment"
import { RxDocumentBase } from 'rxdb';

const moment = moment_

@Pipe({ name: 'docVersion' })
export class DocVersionPipe implements PipeTransform {
  transform(val: RxDocumentBase<any> & any, args) {
    return val.get("_rev").split("-")[0]
  }
}
