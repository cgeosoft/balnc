import { NgModule } from '@angular/core'
import { FileUploadModule } from 'ng2-file-upload'
import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular-5.x'
import * as cloudinary from 'cloudinary-core'

import { FilesService } from "./files.service"

@NgModule({
    imports: [
        CloudinaryModule.forRoot(cloudinary, require("../../../../cloudary.config.json")),
        FileUploadModule,
    ],
    declarations: [],
    bootstrap: [],
    providers: [
        FilesService
    ]
})
export class FilesModule { }
