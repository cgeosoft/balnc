import { Directive, Self } from "@angular/core"
import { NgControl } from "@angular/forms"

const controlStatusHost = {
    "[class.is-valid]": "ngClassValid",
    "[class.is-invalid]": "ngClassInvalid"
}

@Directive({ selector: "[formControlName],[ngModel],[formControl]", host: controlStatusHost })
export class BSControlStatusDirective {
    public constructor( @Self() private control: NgControl) {
    }

    get ngClassValid(): boolean {
        if (this.control.control == null) {
            return false
        }
        return this.control.control.valid
    }

    get ngClassInvalid(): boolean {
        if (this.control.control == null) {
            return false
        }
        return this.control.control.invalid
    }
}