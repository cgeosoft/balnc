import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    // title = 'app';

    // remoteDB = new PouchDB('http://192.168.1.200:5984/db');
    // localDB = new PouchDB("chat")
    // user: any
    // newMessage: string
    // messageObservable: Observable<any[]>
    // messageSubscriber: Subscriber<any[]>

    // @ViewChild('chat') private chatContainer: ElementRef;

    // scrollToBottom(): void {
    //     try {
    //         this.zone.run(() => {
    //             this.chatContainer.nativeElement.scrollTop =
    //                 this.chatContainer.nativeElement.scrollHeight - 40;
    //         })
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    constructor(
        // private http: HttpClient,
        // private zone: NgZone
    ) {
        // this.messageObservable = Observable
        //     .create((observer: Subscriber<any[]>) => {
        //         this.messageSubscriber = observer
        //     });

        // this.http
        //     .get('https://randomuser.me/api')
        //     .subscribe(data => {
        //         // Read the result field from the JSON response.
        //         this.user = data['results'][0];
        //     });
    }

    ngOnInit(): void {
        // this.zone.run(() => {
        // PouchDB.sync(this.localDB, this.remoteDB, {
        //     live: true,
        //     retry: true
        // });
        // // });
        // this.localDB
        //     .changes({
        //         live: true,
        //     })
        //     .on('change', (change) => {
        //         // console.log("change", change)
        //         this.zone.run(() => {
        //             this.getDocs().then(() => {
        //                 this.scrollToBottom();
        //             })
        //         });
        //     })
        //     .on('error', (err) => {
        //         console.log(err)
        //         // handle errors
        //     });
        // this.getDocs()

        // Observable
        //     .timer(5000, 500)
        //     .subscribe(t => {
        //         this.newMessage = loremIpsum({
        //             count: 1, units: 'paragraphs'
        //         })
        //         this.addOne()
        //     })
    }

    // getDocs() {
    //     return this.localDB
    //         .allDocs({
    //             include_docs: true
    //         })
    //         .then((result) => {
    //             const messages = result.rows
    //                 .filter(item => {
    //                     return (item.doc["type"] === "MESSAGE")
    //                 })
    //                 // .sort((itemA) => {
    //                 //     return itemA.doc["user"]
    //                 // })
    //                 .map(item => {
    //                     return item.doc
    //                 })
    //                 .sort((itemA, itemB) => {
    //                     return itemA["time"] - itemB["time"]
    //                 })

    //             this.messageSubscriber.next(messages)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    // addOne() {
    //     if (this.newMessage.trim().length === 0) {
    //         this.newMessage = null;
    //         return;
    //     }

    //     this.localDB
    //         .put({
    //             _id: this.makeid(),
    //             type: "MESSAGE",
    //             text: this.newMessage.trim(),
    //             time: new Date().getTime(),
    //             user: {
    //                 picture: this.user.picture.thumbnail,
    //                 name: `${this.user.name.first} ${this.user.name.last}`,
    //             }
    //         })
    //         .then((response) => {
    //             // console.log(response)
    //             this.newMessage = null;
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    // makeid() {
    //     let text = "";
    //     const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    //     for (let i = 0; i < 8; i++) {
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     }
    //     return text;
    // }

}
