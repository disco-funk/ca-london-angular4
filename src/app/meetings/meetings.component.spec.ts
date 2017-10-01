import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {MeetingsComponent} from "./meetings.component";

xdescribe("MeetingsComponent", () => {
    let component: MeetingsComponent;
    let fixture: ComponentFixture<MeetingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MeetingsComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MeetingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
