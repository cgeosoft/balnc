import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-presentation-add-page',
    templateUrl: './add-page.component.html'
})
export class AddPageComponent {

    page: any = {
        title: null,
        file: null,
        blob: null,
        fileType: null,
    };
    imagePreview: string

    constructor(public activeModal: NgbActiveModal) { }

    submit() {
        this.activeModal.close(this.page)
    }

    loadFile($event): void {
        this.page.file = $event.target.files[0];
        const reader: FileReader = new FileReader();

        reader.onloadend = (e) => {
            this.imagePreview = reader.result
            const parts = reader.result.split(",")
            const info = parts[0].split(";")
            // this.page.blob = parts[1];
            this.page.fileType = info[0].replace("data:", "");
        }
        reader.readAsDataURL(this.page.file);
    }
}
