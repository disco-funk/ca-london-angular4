import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AppComponent} from "./app.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {StaticPageComponent} from "../static-page/static-page.component";
import {Router} from "@angular/router";
import {PageTitleService} from "../core/page-title.service";
import {Title} from "@angular/platform-browser";
import {StaticPageService} from "../static-page/static-page.service";
import {APP_CONFIG} from "../config/app.config";
import {mockAppConfig} from "../config/mocks/mock-app.config";
import {MockStaticPageService} from "../static-page/mocks/mock-static-page-service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Component} from "@angular/core";

describe("AppComponent", () => {
    let component: AppComponent, router: Router, pageTitleService: PageTitleService, title: Title,
        staticPageService: StaticPageService;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, StaticPageComponent, DummyComponent],
            imports: [NgbModule.forRoot(),
                RouterTestingModule.withRoutes(
                    [
                        {path: "page/:id", component: StaticPageComponent},
                        {path: "home", component: DummyComponent, data: {title: "Dynamic Page Title"}}
                    ])],
            providers: [
                PageTitleService,
                Title,
                {provide: StaticPageService, useClass: MockStaticPageService},
                {provide: APP_CONFIG, useValue: mockAppConfig}
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        pageTitleService = fixture.debugElement.injector.get(PageTitleService);
        title = fixture.debugElement.injector.get(Title);
        staticPageService = fixture.debugElement.injector.get(StaticPageService);
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });

    describe("Narrow format navbar collapsed initial state", () => {
        it("should be true", () => {
            expect(component.isCollapsed).toEqual(true);
            expect(component.isLoading).toEqual(true);
        });
    });

    describe("#ngOnInit", () => {
        beforeEach(() => {
            spyOn(title, "setTitle");
        });

        it("should add page title for dynamic page", () => {
            router.navigate(["home"])
                .then(result => {
                    expect(result).toEqual(true);
                    expect(component.pageTitleService.title).toEqual("Dynamic Page Title");
                    expect(title.setTitle).toHaveBeenCalledWith("Dynamic Page Title | Cocaine Anonymous London");
                    expect(component.isLoading).toEqual(false);
                }, err => {
                    fail(`Router navigation error : ${err}`);
                });
            fixture.detectChanges();
        });

        it("should add page title for static page if page cache is ready", () => {
            spyOnProperty(staticPageService, "pageCacheReady", "get").and.returnValue(new BehaviorSubject<boolean>(true));

            router.navigate(["page", "static"])
                .then(result => {
                    expect(result).toEqual(true);
                    expect(component.pageTitleService.title).toEqual("What To Expect At A C.A. Meeting");
                    expect(title.setTitle).toHaveBeenCalledWith("What To Expect At A C.A. Meeting | Cocaine Anonymous London");
                    expect(component.isLoading).toEqual(false);
                }, err => {
                    fail(`Router navigation error : ${err}`);
                });
            fixture.detectChanges();
        });

        it("should display loading information if page cache is not ready", () => {
            spyOnProperty(staticPageService, "pageCacheReady", "get").and.returnValue(new BehaviorSubject<boolean>(false));

            router.navigate(["page", "static"])
                .then(result => {
                    expect(result).toEqual(true);
                    expect(component.pageTitleService.title).toEqual("Loading...");
                    expect(title.setTitle).toHaveBeenCalledWith("Cocaine Anonymous London");
                    expect(component.isLoading).toEqual(true);
                }, err => {
                    fail(`Router navigation error : ${err}`);
                });
            fixture.detectChanges();
        });

        it("should add page title for static page if page cache is not ready but later becomes ready", () => {
            spyOnProperty(staticPageService, "pageCacheReady", "get").and.returnValue(new BehaviorSubject<boolean>(false));

            router.navigate(["page", "static"])
                .then(result => {
                    staticPageService.pageCacheReady.next(true);

                    expect(result).toEqual(true);
                    expect(component.pageTitleService.title).toEqual("What To Expect At A C.A. Meeting");
                    expect(title.setTitle).toHaveBeenCalledWith("What To Expect At A C.A. Meeting | Cocaine Anonymous London");
                    expect(component.isLoading).toEqual(false);
                }, err => {
                    fail(`Router navigation error : ${err}`);
                });
            fixture.detectChanges();
        });
    });
});

@Component({
    selector: "ca-dummy-component",
    template: "<div></div>"
})
class DummyComponent {
}