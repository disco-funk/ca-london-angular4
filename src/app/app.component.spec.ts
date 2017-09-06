import {TestBed, async, ComponentFixture} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppComponent} from "./app.component";
import {Router} from "@angular/router";
import {HomeComponent} from "./home/home.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>, component: AppComponent, router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, HomeComponent
      ],
      imports: [
        NgbModule.forRoot(),
        RouterTestingModule.withRoutes(
          [{path: "home", component: HomeComponent, data: {title: "Home"}}])
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    router = fixture.debugElement.injector.get(Router);
    component = fixture.debugElement.componentInstance;
  }));

  it("should create the app", async(() => {
    expect(component).toBeTruthy();
  }));

  describe("Menu", () => {
    it(`should be collapsed`, async(() => {
      expect(component.isCollapsed).toEqual(true);
    }));
  });

  it("should render title in a h2 tag", () => {
    fixture.detectChanges();

    router
      .navigate(["home"])
      .then(() => {

        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement;

        expect(component.title).toEqual("Home");
        expect(element.querySelector("h2").innerText).toEqual("Home");
      });
  });
});
