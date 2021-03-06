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
import {DynamicHTMLModule} from "ng-dynamic";
import {RouterLinkWhatIsCaComponent} from "../static-page/router-link/router-link.component";

describe("AppComponent", () => {
    let component: AppComponent, router: Router, pageTitleService: PageTitleService, title: Title,
        staticPageService: StaticPageService;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, StaticPageComponent, DummyComponent, RouterLinkWhatIsCaComponent],
            imports: [NgbModule.forRoot(),
                RouterTestingModule.withRoutes(
                    [
                        {path: "page/:id", component: StaticPageComponent},
                        {path: "home", component: DummyComponent, data: {title: "Dynamic Page Title"}}
                    ]),
                DynamicHTMLModule.forRoot({
                    components: [
                        {component: RouterLinkWhatIsCaComponent, selector: "ca-fake-router-link"}
                    ]
                })],
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
        router = fixture.debugElement.injector.get(Router);
        pageTitleService = fixture.debugElement.injector.get(PageTitleService);
        title = fixture.debugElement.injector.get(Title);
        staticPageService = fixture.debugElement.injector.get(StaticPageService);

        spyOn(title, "setTitle");

        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });

    describe("Component initial state", () => {
        it("should be collapsed and loading with no disclaimer", () => {
            expect(component.isCollapsed).toEqual(true);
            expect(component.isLoading).toEqual(true);
            expect(component.disclaimers).toEqual([]);
        });
    });

    describe("#ngOnInit", () => {
        it("should add page title and disclaimer for dynamic page", () => {
            router.navigate(["home"])
                .then(result => {
                    expect(result).toEqual(true);
                    expect(component.isLoading).toEqual(false);
                    expect(component.pageTitleService.title).toEqual("Dynamic Page Title");
                    expect(title.setTitle).toHaveBeenCalledWith("Dynamic Page Title | Cocaine Anonymous London");
                    expect(component.disclaimers).toEqual(["disclaimmain", "disclaimhome"]);
                }, err =>
                    fail(`Router navigation error : ${err}`));
            fixture.detectChanges();
        });

        it("should add page title and disclaimer for static page if page cache is ready", () => {
            spyOnProperty(staticPageService, "pageCacheReady", "get").and.returnValue(new BehaviorSubject<boolean>(true));

            router.navigate(["page", "static"])
                .then(result => {
                    expect(result).toEqual(true);
                    expect(component.pageTitleService.title).toEqual("What To Expect At A C.A. Meeting");
                    expect(title.setTitle).toHaveBeenCalledWith("What To Expect At A C.A. Meeting | Cocaine Anonymous London");
                    expect(component.isLoading).toEqual(false);
                    expect(component.disclaimers).toEqual(["disclaimmain"]);
                }, err =>
                    fail(`Router navigation error : ${err}`));
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
                    expect(component.disclaimers).toEqual([]);
                }, err =>
                    fail(`Router navigation error : ${err}`));
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
                    expect(component.disclaimers).toEqual(["disclaimmain"]);
                }, err =>
                    fail(`Router navigation error : ${err}`));
            fixture.detectChanges();
        });
    });
});

@Component({
    selector: "ca-dummy-component",
    template: "<div>Dummy Component</div>"
})
class DummyComponent {
}