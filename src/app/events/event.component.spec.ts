import {DebugElement} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DatePipe} from "@angular/common";
import {By} from "@angular/platform-browser";
import {EventComponent} from "./event.component";
import {TestEvents} from "./mocks/event-data.spec";
import {SafeHtmlPipe} from "./safe-html.pipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MapModalButtonComponent} from "../common/map-modal-button/map-modal-button.component";

describe("EventComponent", () => {
    let component: EventComponent;
    let fixture: ComponentFixture<EventComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EventComponent, SafeHtmlPipe, MapModalButtonComponent],
            providers: [DatePipe],
            imports: [NgbModule.forRoot()]
        });

        fixture = TestBed.createComponent(EventComponent);
        component = fixture.componentInstance;

        component.eventDetails = TestEvents[0];
        component.isEven = true;
    });

    describe("fixture", () => {
        it("should initialise", () => {
            expect(component).toBeDefined();
            fixture.detectChanges();

            const h4Tags: DebugElement = fixture.debugElement.query(By.css("div>div>h4"));
            const h3Tags: DebugElement[] = fixture.debugElement.queryAll(By.css("div>div>h3"));
            const pTags: DebugElement[] = fixture.debugElement.queryAll(By.css("div>div>p"));
            const addressTags: DebugElement = fixture.debugElement.query(By.css("div>div>address"));

            expect(h4Tags.nativeElement.textContent).toEqual("The Steps We Took Meeting");

            expect(h3Tags[0].nativeElement.textContent).toEqual("Special Event");
            expect(h3Tags[1].nativeElement.textContent).toEqual("Tuesday 9 March 2027");

            expect(pTags[0].nativeElement.textContent).toEqual("7:00 PM - 9:30 PM");

            expect(addressTags.nativeElement.textContent).toEqual(`Fulham Methodist Church
            452 Fulham Road
            
            London
            SW6 1BY
        `);

            expect(pTags[1].nativeElement.textContent).toEqual("To celebrate Nicholas L's impending milestone of 25 years of unbroken clean "
                + "and sober time the Steps We Took meeting of Cocaine Anonymous invites you to a special event. Nicholas will be sharing his "
                + "story of Hope Faith and Courage whilst presenting a workshop in the form of a fundraising Q and A session. Food fun and "
                + "fellowship will be available on the night.");
        });
    });


    describe("#getFlyerHref", () => {
        beforeEach(() => {
            component.eventDetails = TestEvents[0];
        });

        it("should return hash as flyer link when there is no flyer", () => {
            component.eventDetails.FlyerName = null;

            const result: string = component.getFlyerHref();

            expect(result).toEqual("#");
        });

        it("should return flyer link when there is a flyer", () => {
            component.eventDetails.FlyerName = "someflyer.pdf";

            const result: string = component.getFlyerHref();

            expect(result).toEqual("./assets/images/events/someflyer.pdf");
        });
    });

    describe("#getDetailsColumnClass", () => {
        beforeEach(() => {
            component.eventDetails = TestEvents[0];
        });

        it("should return hash as flyer link when there is no thumbnail", () => {
            component.eventDetails.ThumbnailName = null;

            const result: Object = component.getDetailsColumnClass();

            expect(result).toEqual({"col-sm-6": false, "col-sm-12": true});
        });

        it("should return flyer link when there is a thumbnail", () => {
            component.eventDetails.ThumbnailName = "somethumbnail.png";

            const result: Object = component.getDetailsColumnClass();

            expect(result).toEqual({"col-sm-6": true, "col-sm-12": false});
        });
    });

    describe("#showEndDate", () => {
        beforeEach(() => {
            component.eventDetails = TestEvents[0];
        });

        it("should not show end date when start and end date are same with different times", () => {
            component.eventDetails.StartDate = "2027-06-30T09:00:00";
            component.eventDetails.EndDate = "2027-06-30T17:00:00";

            const result: boolean = component.showEndDate();

            expect(result).toEqual(false);
        });

        it("should not show end date when end date is null", () => {
            component.eventDetails.StartDate = "2027-06-30T09:00:00";
            component.eventDetails.EndDate = null;

            const result: boolean = component.showEndDate();

            expect(result).toEqual(false);
        });

        it("should show end date when start and end date are different dates", () => {
            component.eventDetails.StartDate = "2027-06-30T09:00:00";
            component.eventDetails.EndDate = "2027-07-01T09:00:00";

            const result: boolean = component.showEndDate();

            expect(result).toEqual(true);
        });
    });

    describe("#showEndTime", () => {
        beforeEach(() => {
            component.eventDetails = TestEvents[0];
        });

        it("should show end time when start and end date are same with different times", () => {
            component.eventDetails.StartDate = "2027-06-30T09:00:00";
            component.eventDetails.EndDate = "2027-06-30T17:00:00";

            const result: boolean = component.showEndTime();

            expect(result).toEqual(true);
        });

        it("should not show end time when end date is null", () => {
            component.eventDetails.StartDate = "2027-06-30T09:00:00";
            component.eventDetails.EndDate = null;

            const result: boolean = component.showEndTime();

            expect(result).toEqual(false);
        });

        it("should show end time when start and end date are different dates", () => {
            component.eventDetails.StartDate = "2027-06-30T09:00:00";
            component.eventDetails.EndDate = "2027-07-01T09:00:00";

            const result: boolean = component.showEndTime();

            expect(result).toEqual(true);
        });
    });
});