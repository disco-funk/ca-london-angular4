import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {MapModalButtonComponent} from "./map-modal-button.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe("MapModalButtonComponent", () => {
    let component: MapModalButtonComponent;
    let fixture: ComponentFixture<MapModalButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapModalButtonComponent],
            imports: [NgbModule.forRoot()]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapModalButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
