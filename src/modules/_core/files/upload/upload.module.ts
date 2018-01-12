import { NgModule } from '@angular/core'

import { CloudinaryUploadModule } from "./cloudary/cloudary.module"
import { UploadService } from "./upload.service"

@NgModule({
    imports: [
        CloudinaryUploadModule
    ],
    declarations: [],
    bootstrap: [],
    providers: [
        UploadService
    ]
})
export class UploadModule { }
