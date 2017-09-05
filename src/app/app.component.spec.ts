import {TestBed, async, ComponentFixture} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppComponent} from "./app.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>, app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NgbModule.forRoot(),
        RouterTestingModule
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it("should create the app", async(() => {
    expect(app).toBeTruthy();
  }));

  describe("Menu", () => {
    it(`should be collapsed`, async(() => {
      expect(app.isCollapsed).toEqual(true);
    }));
  });

  it(`should have as title 'app'`, async(() => {
    expect(app.title).toBeUndefined();
    fixture.detectChanges();
    expect(app.title).toEqual("Home");
  }));


  it("should render title in a h1 tag", async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain("Welcome to app!");
  }));
});
