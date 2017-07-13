import { Component, ViewChild } from '@angular/core';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = MainPage;

    constructor() {
    }
}