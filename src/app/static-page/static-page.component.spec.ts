import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StaticPageComponent } from "./static-page.component";

describe("StaticPageComponent", () => {
  let component: StaticPageComponent;
  let fixture: ComponentFixture<StaticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  describe("Routing", () => {
    it("should load the page content", () => {
    });
  });
});