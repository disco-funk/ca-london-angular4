import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, Router} from "@angular/router";
import {StaticPageComponent} from "./static-page.component";
import "rxjs/add/observable/of";
import {Observable} from "rxjs/Observable";
import {StaticPageService} from "./static-page.service";
import {MockStaticPageService} from "./mocks/mock-static-page-service";

fdescribe("StaticPageComponent", () => {
  let component: StaticPageComponent;
  let fixture: ComponentFixture<StaticPageComponent>, router: Router;

  const STATIC_PAGE: string = "aboutmeeting";

  class MockActivatedRoute extends ActivatedRoute {
    params = Observable.of({id: STATIC_PAGE});
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaticPageComponent],
      providers: [
        {provide: StaticPageService, useClass: MockStaticPageService},
        {provide: ActivatedRoute, useValue: new MockActivatedRoute()}
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{
            path: "page/:id",
            component: StaticPageComponent
          }])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);

    component.pageCacheReady = true;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  describe("Routing", () => {
    it("should load the page content", () => {
      fixture.detectChanges();

      router
        .navigate(["page", STATIC_PAGE])
        .then(success => {
          expect(success).toEqual(true);
          expect(component.pageName).toEqual(STATIC_PAGE);
          expect(component.pageContent).toEqual("<div>about some content</div>");

          const element = fixture.debugElement.nativeElement;
          expect(element.querySelector("div").innerText).toEqual("about some content");
        });
    });
  });
});
