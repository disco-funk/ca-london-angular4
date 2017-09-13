import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {StaticPageComponent} from "./static-page.component";
import {By} from "@angular/platform-browser";
import {StaticPageService} from "./static-page.service";
import {APP_CONFIG} from "../config/app.config";
import {mockAppConfig} from "../config/mocks/mock-app.config";
import {MockStaticPageService} from "./mocks/mock-static-page-service";
import {DebugElement} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RouterTestingModule} from "@angular/router/testing";
import {DynamicHTMLModule} from "ng-dynamic";
import {RouterLinkWhatIsCaComponent} from "./router-link/router-link.component";

describe("StaticPageComponent", () => {
    let component: StaticPageComponent, staticPageService: StaticPageService;
    let fixture: ComponentFixture<StaticPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StaticPageComponent, RouterLinkWhatIsCaComponent],
            providers: [
                {provide: StaticPageService, useClass: MockStaticPageService},
                {provide: APP_CONFIG, useValue: mockAppConfig}
            ],
            imports: [RouterTestingModule.withRoutes(
                [
                    {path: "page/:id", component: StaticPageComponent}
                ]),
                DynamicHTMLModule.forRoot({
                    components: [
                        {component: RouterLinkWhatIsCaComponent, selector: "ca-fake-router-link"}
                    ]
                })]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StaticPageComponent);
        staticPageService = fixture.debugElement.injector.get(StaticPageService);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });

    describe("When initialised", () => {
        it("should not show page content when it is not ready", () => {
            spyOnProperty(staticPageService, "pageCacheReady", "get").and.returnValue(new BehaviorSubject<boolean>(false));

            fixture.detectChanges();

            const debugElement: DebugElement = fixture.debugElement.query(By.css("div"));

            expect(component.rawPageContent).toEqual("");
            expect(debugElement.nativeElement.innerText).toEqual("");
        });

        it("should load page content when it is ready", () => {
            spyOnProperty(staticPageService, "pageCacheReady", "get").and.returnValue(new BehaviorSubject<boolean>(true));

            fixture.detectChanges();

            const debugElement: DebugElement = fixture.debugElement.query(By.css("div"));

            expect(component.rawPageContent).toEqual("<div>about some content</div>");
            expect(debugElement.nativeElement.innerText).toEqual("about some content");
        });
    });
});