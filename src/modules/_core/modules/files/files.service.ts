import { Injectable, Injector } from '@angular/core'

import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload'

import { UploadService } from "./upload/upload.service"

@Injectable()
export class FilesService {

    static uploadService: UploadService

    uploader: FileUploader

    constructor(
        private uploadService: UploadService,
    ) {
        this.uploader = uploadService.uploader
    }

    add(file: any): Promise<string> {
        return this.uploadService
            .upload(file)
            .then((result) => {
                return result
            })
    }

    private titleCase(str) {
        return str.replace(/\b\S/g, function (t) { return t.toUpperCase() })
    }

}
