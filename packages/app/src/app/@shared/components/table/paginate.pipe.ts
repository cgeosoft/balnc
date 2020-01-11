import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'paginate' })
export class PaginatePipe implements PipeTransform {
  transform (data: any[], page: number, limit: number, sort: any, direction: any) {
    if (sort && sort.val) {
      data.sort((a, b) => {
        let vala = sort.val(a)
        let valb = sort.val(b)
        if (direction === 'ASC') {
          return (vala > valb) ? 1 : ((valb > vala) ? -1 : 0)
        } else if (direction === 'DESC') {
          return (vala > valb) ? 1 : ((valb > vala) ? -1 : 0)
        }
      })
    }
    return data.slice(page * limit, page * limit + limit)
  }
}
