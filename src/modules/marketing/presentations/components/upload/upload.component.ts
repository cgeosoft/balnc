import { Component, OnInit, Input, NgZone } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { FileUploader } from 'ng2-file-upload'

import { FilesService } from ".././../../../_core/files/files.service"
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-presentation-upload',
    templateUrl: 'upload.component.html'
})
export class UploadComponent implements OnInit {

    @Input()
    responses: Array<any>

    hasBaseDropZoneOver: Boolean = false
    uploader: FileUploader
    title: string

    constructor(
        private filesService: FilesService,
        private zone: NgZone,
        private http: HttpClient,
        public activeModal: NgbActiveModal,
    ) {
    }

    ngOnInit(): void {
        this.uploader = this.filesService.uploader
    }

}
