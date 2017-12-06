import { Injectable } from '@angular/core'
import { UploadInterface } from "../upload.interface"

@Injectable()
export class CloudaryUploadService implements UploadInterface {

    file: string;

    constructor(config: any) {

    }

    upload(file: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
