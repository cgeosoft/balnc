import { Injectable } from '@angular/core'

import { UploadInterface } from "./upload/upload.interface"
import { CloudaryUploadService } from "./upload/cloudary/cloudary-upload.service"
import { ConfigService } from '../config/config.service';

@Injectable()
export class FilesService {

    static uploadService: UploadInterface

    constructor(
        private configService: ConfigService
    ) {
        const config = this.configService.get("files")
        const providerConfig = config[config.provider]
        FilesService.uploadService = new window[`${this.titleCase(config.provider)}UploadService`](providerConfig);
    }

    add(file: any): Promise<string> {
        return FilesService.uploadService
            .upload(file)
            .then((result) => {
                return result
            })
    }

    private titleCase(str) {
        return str.replace(/\b\S/g, function (t) { return t.toUpperCase() });
    }

}
