import { FileUploader } from "ng2-file-upload";

export interface UploadInterface {

    file: string

    config(config: any): void
    upload(file: string): Promise<string>
    getUploader(): FileUploader
}
