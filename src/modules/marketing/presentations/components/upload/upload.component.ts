import { Component, OnInit, Input, NgZone } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { FileUploader } from 'ng2-file-upload'

import { FilesService } from ".././../../../_core/modules/files/files.service"

@Component({
    selector: 'app-presentation-upload',
    templateUrl: 'upload.component.html'
})
export class UploadComponent implements OnInit {

    @Input()
    responses: Array<any>

    private hasBaseDropZoneOver: Boolean = false
    private uploader: FileUploader
    private title: string

    constructor(
        private filesService: FilesService,
        private zone: NgZone,
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
        this.uploader = this.filesService.uploader
    }

}
