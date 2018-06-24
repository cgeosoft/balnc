import { Pipe, PipeTransform } from '@angular/core'
import * as moment_ from "moment"

const moment = moment_

@Pipe({ name: 'ago' })
export class AgoPipe implements PipeTransform {
  transform(val, args) {
    return moment(val).fromNow();
  }
}
