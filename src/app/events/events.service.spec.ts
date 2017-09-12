import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {EventsService} from "./events.service";
import {IEvent} from "./event.interface";
import {TestEventEditor, TestEvents} from "./mocks/event-data.spec";
import {mockAppConfig} from "./mocks/mock-app-config.data";
import {TestRequest} from "@angular/common/http/testing";
import {APP_CONFIG} from "../config/app.config";

describe("EventsService", () => {
    let service: EventsService, http: HttpTestingController;
    let actualEvents: Array<IEvent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EventsService, {provide: APP_CONFIG, useValue: mockAppConfig}]
        });

        http = TestBed.get(HttpTestingController);
        service = TestBed.get(EventsService);
    });

    describe("API calls", () => {
        beforeEach(() => {
            actualEvents = [];
        });

        it("should get data when getEvents is called", () => {
            service.getEvents().subscribe((events: Array<IEvent>) => actualEvents = events);

            const req: TestRequest = http.expectOne("http://my.url/api/events?isActive=true");

            expect(req.request.method).toEqual("GET");

            req.flush(TestEvents);

            expect(actualEvents).toEqual(TestEvents);
        });

        it("should get data when getAllEvents is called for editor page", () => {
            service.getAllEvents().subscribe((events: Array<IEvent>) => actualEvents = events);

            const req: TestRequest = http.expectOne("http://my.url/api/events");

            expect(req.request.method).toEqual("GET");

            req.flush(TestEvents);

            expect(actualEvents).toEqual(TestEvents);
        });

        it("should get data when getEvents is called", () => {
            service.postEvent(TestEventEditor).subscribe();

            const req: TestRequest = http.expectOne("http://my.url/api/events");

            expect(req.request.method).toEqual("POST");

            req.flush(null);
        });

        afterEach(() => {
            http.verify();
        });
    });
});