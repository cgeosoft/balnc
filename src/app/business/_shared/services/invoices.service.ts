import { Injectable } from '@angular/core';
import { RxDBService } from '@balnc/core';
import { CommonService } from '@balnc/shared';

@Injectable()
export class InvoicesService extends CommonService {

  constructor (
        dbService: RxDBService
      ) {
      super(dbService)
    }
}
