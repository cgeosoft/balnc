import { Pipe, PipeTransform } from '@angular/core'

import * as moment from "moment"

@Pipe({ name: 'ago' })
export class AgoPipe implements PipeTransform {
  transform(val, args) {
    return moment(val).fromNow();
  }
}
