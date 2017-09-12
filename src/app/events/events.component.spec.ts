import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {EventsComponent} from "./events.component";
import {SafeHtmlPipe} from "./safe-html.pipe";
import {DatePipe} from "@angular/common";
import {EventsService} from "./events.service";
import {APP_CONFIG} from "../config/app.config";
import {mockAppConfig} from "../config/mocks/mock-app.config";
import {HttpClient} from "@angular/common/http";
import {TestEvents} from "./mocks/event-data.spec";
import {MockHttpClient} from "./mocks/mock-http-client.service";
import {MockEventsService} from "./mocks/mock-events-list.service";
import {EventComponent} from "./event.component";
import {MapModalButtonComponent} from "../common/map-modal-button/map-modal-button.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe("EventsComponent", () => {
    let component: EventsComponent;
    let fixture: ComponentFixture<EventsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsComponent, EventComponent, SafeHtmlPipe,
                MapModalButtonComponent],
            providers: [DatePipe, {provide: EventsService, useClass: MockEventsService},
                {provide: APP_CONFIG, useValue: mockAppConfig},
                {provide: HttpClient, useValue: MockHttpClient}],
            imports: [NgbModule.forRoot()]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });

    describe("initialising component", () => {
        it("should initialise correctly", () => {
            expect(component.events).toEqual([]);
            expect(component.isLoading).toEqual(true);

            fixture.detectChanges();

            expect(component.events).toEqual(TestEvents);
            expect(component.isLoading).toEqual(false);
        });

        // TODO API failure test
    });
});
