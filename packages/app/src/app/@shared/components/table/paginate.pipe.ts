import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'paginate' })
export class PaginatePipe implements PipeTransform {
  transform (data: any[], page: number, limit: number) {
    return data.slice(page * limit, page * limit + limit)
  }
}
