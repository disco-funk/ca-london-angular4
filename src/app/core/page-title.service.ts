import {Injectable} from "@angular/core";

@Injectable()
export class PageTitleService {

    private _title: string;

    constructor() {
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }
}