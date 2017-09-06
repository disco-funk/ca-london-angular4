import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {StaticPageComponent} from "./static-page.component";

describe("StaticPageComponent", () => {
  let component: StaticPageComponent;
  let fixture: ComponentFixture<StaticPageComponent>, router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaticPageComponent],
      imports: [
        RouterTestingModule.withRoutes(
          [{
            path: "page/:id",
            component: StaticPageComponent
          }])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  fdescribe("Routing", () => {
    it("should load the page content", () => {
      router
        .navigate(["page", "test"])
        .then(() => {
          console.log("Routed....");
          fixture.detectChanges();
          expect(component.pageName).toEqual("asdfaasdfsd");
          const element = fixture.debugElement.nativeElement;

          // expect(component.pageContent).toEqual("<div>about some content</div>");
          // expect(element.querySelector("div").innerText).toEqual("Home");
        });
    });
  });
});
