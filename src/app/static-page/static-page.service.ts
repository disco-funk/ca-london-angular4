import {Inject, Injectable} from "@angular/core";
import {IPage} from "./page.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {APP_CONFIG} from "../config/app.config";
import * as _ from "lodash";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class StaticPageService {

    private _pageCacheReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _pageCache: Array<IPage>;

    constructor(@Inject(APP_CONFIG) private config, private httpClient: HttpClient) {
        this.loadPages()
            .subscribe(pages => this._pageCache = pages,
                () => {
                },
                () => this._pageCacheReady.next(true));
    }

    getPage(pageName: string): IPage {
        return _.head(_.filter(this._pageCache, page => page.PageName === pageName));
    }

    private loadPages(): Observable<Array<IPage>> {
        return this.httpClient
            .get<Array<IPage>>(`${this.config.API_URL}api/pages?contentType`);
    }

    get pageCacheReady(): BehaviorSubject<boolean> {
        return this._pageCacheReady;
    }

    get pageCache(): Array<IPage> {
        return this._pageCache;
    }

    set pageCache(value: Array<IPage>) {
        this._pageCache = value;
    }
}
