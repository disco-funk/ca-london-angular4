import {Inject, Injectable} from "@angular/core";
import {IPage} from "./page.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {APP_CONFIG, ICALondonAppConfig} from "../config/app.config";
import * as _ from "lodash";

@Injectable()
export class StaticPageService {
  get pageCache(): Array<IPage> {
    return this._pageCache;
  }

  set pageCache(value: Array<IPage>) {
    this._pageCache = value;
  }

  private _pageCache: Array<IPage>;

  constructor(@Inject(APP_CONFIG) private config: ICALondonAppConfig, private httpClient: HttpClient) {
    this.loadPages()
      .subscribe(pages => this._pageCache = pages);
  }

  private loadPages(): Observable<Array<IPage>> {
    return this.httpClient
      .get<Array<IPage>>(`${this.config.API_URL}api/pages`);
  }

  getPage(pageName: string): IPage {
      return _.head(_.filter(this._pageCache, page => page.PageName === pageName));
  }
}
