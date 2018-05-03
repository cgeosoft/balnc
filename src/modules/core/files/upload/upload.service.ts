import { Injectable, Injector } from '@angular/core'
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload'
import { UploadInterface } from "./upload.interface"

import { CloudaryUploadService } from './cloudary/cloudary.service'

import { ConfigService } from '@blnc/common/services/config.service';

@Injectable()
export class UploadService {

    static srv: UploadInterface

    uploader: any

    constructor(
        private injector: Injector,
        private configService: ConfigService
    ) {
        const config = this.configService.config.files
        const providerConfig = config[config._provider]

        switch (config._provider) {
            case "cloudary":
                UploadService.srv = this.injector.get(CloudaryUploadService)
                this.uploader = UploadService.srv.getUploader()
                break
        }

        UploadService.srv.config(providerConfig)
    }

    upload(file: any): Promise<string> {
        return UploadService.srv
            .upload(file)
            .then((result) => {
                return result
            })
    }

    private titleCase(str) {
        return str.replace(/\b\S/g, function (t) { return t.toUpperCase() })
    }
}
