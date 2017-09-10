import {Observable} from "rxjs/Observable";
import {IEvent} from "../event.interface";
import {TestEvents} from "./event-data.spec";
import "rxjs/add/observable/of";

export class MockEventsService {

    postEvent: jasmine.Spy = jasmine.createSpy("postEvent")
        .and.callFake(() => {
            return Observable.of(null);
        });

    getEvents(): Observable<Array<IEvent>> {
        return Observable.of(TestEvents);
    }

    getAllEvents(): Observable<Array<IEvent>> {
        return Observable.of(TestEvents);
    }
}