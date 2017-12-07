import { NgModule } from '@angular/core'
import { FileUploadModule } from 'ng2-file-upload'

import { UploadModule } from "./upload/upload.module"

import { FilesService } from "./files.service"

@NgModule({
    imports: [
        FileUploadModule,
        UploadModule,
    ],
    declarations: [],
    bootstrap: [],
    providers: [
        FilesService,
    ]
})
export class FilesModule { }
