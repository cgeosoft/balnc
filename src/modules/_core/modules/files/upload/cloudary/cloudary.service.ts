import { Injectable, Injector } from '@angular/core'
import { UploadInterface } from "../upload.interface"

import { Cloudinary } from '@cloudinary/angular-5.x'
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

@Injectable()
export class CloudaryUploadService implements UploadInterface {
    uploader: FileUploader;

    file: string
    // cloudinary: Cloudinary

    constructor(
        protected cloudinary: Cloudinary
    ) {

        // this.cloudinary = this.injector.get(Cloudinary)
    }

    config(config: any): void {

        const uploaderOptions: FileUploaderOptions = {
            url: `https://api.cloudinary.com/v1_1/${config.cloud_name}/upload`,
            autoUpload: true,
            isHTML5: true,
            removeAfterUpload: true,
            headers: [
                {
                    name: 'X-Requested-With',
                    value: 'XMLHttpRequest'
                }
            ]
        }
        this.uploader = new FileUploader(uploaderOptions)

        this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
            form.append('upload_preset', config.upload_preset)
            form.append('file', fileItem)
            fileItem.withCredentials = false
            return { fileItem, form }
        }

        const upsertResponse = fileItem => {

            // Run the update in a custom zone since for some reason change detection isn't performed
            // as part of the XHR request to upload the files.
            // Running in a custom zone forces change detection
            // this.zone.run(() => {
            //     // Update an existing entry if it's upload hasn't completed yet

            //     // Find the id of an existing item
            //     const existingId = this.responses.reduce((prev, current, index) => {
            //         if (current.file.name === fileItem.file.name && !current.status) {
            //             return index
            //         }
            //         return prev
            //     }, -1)
            //     if (existingId > -1) {
            //         // Update existing item with new data
            //         this.responses[existingId] = Object.assign(this.responses[existingId], fileItem)
            //     } else {
            //         // Create new response
            //         this.responses.push(fileItem)
            //     }
            // })
        }

        // Update model on completion of uploading a file
        // this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
        //     upsertResponse(
        //         {
        //             file: item.file,
        //             status,
        //             data: JSON.parse(response)
        //         }
        //     )

        // // Update model on upload progress event
        // this.uploader.onProgressItem = (fileItem: any, progress: any) =>
        //     upsertResponse(
        //         {
        //             file: fileItem.file,
        //             progress,
        //             data: {}
        //         }
        //     )
    }

    upload(file: string): Promise<string> {
        throw new Error("Method not implemented.")
    }

    getUploader() {
        return this.uploader
    }


}
