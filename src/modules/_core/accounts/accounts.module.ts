import { NgModule } from '@angular/core';

import { DatabaseModule } from '@blnc/core/database/database.module';
import { Entity } from '@blnc/core/database/models/entity';
import { AccountSchema } from '@blnc/core/accounts/data/account';
import { AccountsService } from '@blnc/core/accounts/accounts.service';
import { CommonModule } from '@blnc/core/common/common.module';

const entities: Entity[] = [{
  name: 'account',
  schema: AccountSchema,
  sync: false,
}]

@NgModule({
  imports: [
    CommonModule,
    DatabaseModule.forChild(entities),
  ],
  declarations: [],
  providers: [AccountsService]
})
export class AccountsModule { }
