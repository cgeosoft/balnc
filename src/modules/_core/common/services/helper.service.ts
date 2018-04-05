import * as _ from 'lodash'

export class HelperService {

    static getIconClass(name: string, addFw?: boolean): string {
        const iconNS = name.split(":")
        if (iconNS.length > 1) {
            switch (iconNS[1]) {
                case "regular":
                    name = "far fa-" + iconNS[0]
                    break;
                default:
                    name = "fa fa-" + iconNS[0]
                    break;
            }
        } else {
            name = "fa fa-" + name
        }

        if (addFw) {
            name += " fa-fw"
        }

        return name
    }
}
