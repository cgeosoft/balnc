import { Component, Input } from '@angular/core';

import * as _ from "lodash"
import * as moment from "moment"

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RxPresentationDocument } from '@balnc/marketing/presentations/data/presentation';

@Component({
    selector: 'app-presentation-add-page',
    templateUrl: './add-page.component.html'
})
export class AddPageComponent {

    @Input() presentation: RxPresentationDocument;

    page: any = {
        title: null,
        description: null,
        file: null,
        blob: null,
        fileType: null,
    };
    imagePreview: string
    imageInfo: any = {
        size: 0,
        width: 0,
        height: 0,
    }

    constructor(public activeModal: NgbActiveModal) { }

    async onSubmit() {

        const pageKey = this.s4() + this.s4()
        const _pages: any[] = this.presentation.pages
        const _att = {
            id: `file-${pageKey}`,
            data: this.page.file,
            type: this.page.fileType
        }

        const att = await this.presentation.putAttachment(_att)

        _pages.unshift({
            key: pageKey,
            title: this.page.title || `Page ${pageKey}`,
            description: this.page.description,
            type: "BGIMG",
            params: {
                image: `file-${pageKey}`
            }
        })

        this.presentation.pages = _pages
        this.presentation.dateUpdated = moment().toISOString()
        this.presentation.save()

        this.activeModal.close(this.page)
    }

    loadFile($event): void {
        this.page.file = $event.target.files[0];
        const reader: FileReader = new FileReader();

        this.imageInfo.size = this.page.file.size

        reader.onloadend = (e) => {
            const img = new Image;
            img.onload = () => {
                this.imageInfo.width = img.width
                this.imageInfo.height = img.height
            };
            img.src = reader.result;

            this.imagePreview = reader.result
            const parts = reader.result.split(",")
            const info = parts[0].split(";")
            // this.page.blob = parts[1];
            this.page.fileType = info[0].replace("data:", "");
        }
        reader.readAsDataURL(this.page.file);
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }
}
