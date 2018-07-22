export class HelperService {

    static getIcon (name: string): string[] {
        const array = []
        const iconNS = name.split(':')
        if (iconNS.length > 1) {
            switch (iconNS[1]) {
                case 'regular':
                    array.push('far')
                    break
                case 'solid':
                    array.push('fas')
                    break
            }
            array.push(iconNS[0])
        } else {
            array.push('fas')
            array.push(name)
        }

        return array
    }
}
