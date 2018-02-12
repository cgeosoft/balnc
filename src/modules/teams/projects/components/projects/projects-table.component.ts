import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-projects-table',
    templateUrl: "./projects-table.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsTableComponent implements OnInit {

    @Input("data") projects

    constructor(
        private cd: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        console.log("ProjectsTableComponent")
        this.cd.markForCheck();
    }

}
