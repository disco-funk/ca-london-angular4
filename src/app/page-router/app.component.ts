import {Title} from "@angular/platform-browser";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {PageTitleService} from "../core/page-title.service";
import {StaticPageService} from "../static-page/static-page.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "ca-app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

    private static TITLE_SUFFIX: string = " | Cocaine Anonymous London";
    isCollapsed: boolean;
    isLoading: boolean;
    disclaimers: Array<string>;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, public pageTitleService: PageTitleService,
                private title: Title, public staticPageService: StaticPageService) {
        this.isCollapsed = true;
        this.isLoading = true;
        this.disclaimers = [];
        this.title.setTitle("Cocaine Anonymous London");
    }

    ngOnInit(): void {
        const activatedRouteObservable: Observable<ActivatedRoute> = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route: ActivatedRoute) => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .filter(route => route.outlet === "primary");

        Observable
            .combineLatest(activatedRouteObservable,
                this.staticPageService.pageCacheReady,
                (activatedRoute: ActivatedRoute, isPageCacheReady: boolean) =>
                    ({activatedRoute, isPageCacheReady}))
            .subscribe(routeInfo => {

                this.isLoading = !routeInfo.isPageCacheReady;

                if (routeInfo.activatedRoute.snapshot.url[0].path === "page") {
                    if (routeInfo.isPageCacheReady) {
                        this.pageTitleService.title =
                            this.staticPageService.getPage(routeInfo.activatedRoute.snapshot.url[1].path).PageTitle;
                        this.title.setTitle(`${this.pageTitleService.title}${AppComponent.TITLE_SUFFIX}`);
                        this.loadDisclaimers(routeInfo.activatedRoute.snapshot.url[1].path);
                    } else {
                        this.pageTitleService.title = "Loading...";
                        this.title.setTitle("Cocaine Anonymous London");
                    }
                } else {
                    this.pageTitleService.title = routeInfo.activatedRoute.snapshot.data.title;
                    this.title.setTitle(`${this.pageTitleService.title}${AppComponent.TITLE_SUFFIX}`);
                    this.loadDisclaimers(routeInfo.activatedRoute.snapshot.url[0].path);
                }
            });
    }

    private loadDisclaimers(pageName: string): void {
        this.disclaimers = ["disclaimmain"];
        if (pageName === "whoismem" || pageName === "whatisca" || pageName.substr(0, 4) === "read") {
            this.disclaimers.push("disclaimlit");
        }
        if (pageName === "home") {
            this.disclaimers.push("disclaimhome");
        }
        if (pageName === "meetings" || pageName === "events" || pageName === "areamap") {
            this.disclaimers.push("disclaim6th");
        }
    }
}