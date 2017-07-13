import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { MyApp } from './app.component';


@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        HttpModule,
    ],
    bootstrap: [MyApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
    ]
})
export class AppModule { }
