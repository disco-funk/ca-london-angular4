import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {IEvent} from "./event.interface";
import {APP_CONFIG} from "../config/app.config";
import {IEventEditor} from "./event-editor.interface";

@Injectable()
export class EventsService {

    static API_URL: string;

    constructor(@Inject(APP_CONFIG) config, private httpClient: HttpClient) {
        EventsService.API_URL = config.API_URL;
    }

    getEvents(): Observable<Array<IEvent>> {
        return this.httpClient
            .get<Array<IEvent>>(`${EventsService.API_URL}api/events?isActive=true`);
    }

    getAllEvents(): Observable<Array<IEvent>> {
        return this.httpClient
            .get<Array<IEvent>>(`${EventsService.API_URL}api/events`);
    }

    postEvent(event: IEventEditor): Observable<any> {
        return this.httpClient
            .post(`${EventsService.API_URL}api/events`, event);
    }
}