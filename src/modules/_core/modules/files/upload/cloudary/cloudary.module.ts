import { NgModule } from '@angular/core'

import * as  Cloudinary from 'cloudinary-core';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';

import { CloudaryUploadService } from "./cloudary.service"

const cloudinaryConfiguration = {
    "cloud_name": "cgeosoft",
    "upload_preset": "balance"
}

@NgModule({
    imports: [
        CloudinaryModule.forRoot(Cloudinary, cloudinaryConfiguration as CloudinaryConfiguration),
    ],
    declarations: [],
    bootstrap: [],
    providers: [
        CloudaryUploadService,
    ],
})
export class CloudinaryUploadModule { }
