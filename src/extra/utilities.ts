export class Utilities {
    // tslint:disable-next-line:ban-types max-line-length
    public static isNumber: Function = (value: any, strict: boolean = false) => !isNaN(window[strict ? 'Number' : 'parseFloat'](value ?? NaN));

}
