import {Title} from "@angular/platform-browser";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {PageTitleService} from "../core/page-title.service";
import {StaticPageService} from "../static-page/static-page.service";

@Component({
    selector: "ca-app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

    private static TITLE_SUFFIX: string = " | Cocaine Anonymous London";
    private isCacheReady: boolean;
    isCollapsed: boolean;
    isLoading: boolean;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, public pageTitleService: PageTitleService,
                private title: Title, private staticPageService: StaticPageService) {
        this.isCollapsed = true;
        this.isLoading = true;
        this.isCacheReady = false;
    }

    ngOnInit(): void {
        this.staticPageService.pageCacheReady
            .subscribe((isCacheReady: boolean) => {
                this.isCacheReady = isCacheReady;

                const segments: Array<string> = this.router.url.split("/");

                if (isCacheReady && segments[1] === "page") {
                    this.pageTitleService.title = this.staticPageService.getPage(segments[2]).PageTitle;
                    this.title.setTitle(`${this.staticPageService.getPage(segments[2]).PageTitle}${AppComponent.TITLE_SUFFIX}`);
                    this.isLoading = false;
                }
            });

        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .filter((event: NavigationEnd) => event.url.startsWith("/page/"))
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .filter(route => route.outlet === "primary")
            .mergeMap(route => route.url)
            .subscribe((url: Array<UrlSegment>) => {
                if (this.isCacheReady) {
                    this.pageTitleService.title = this.staticPageService.getPage(url[1].path).PageTitle;
                    this.title.setTitle(`${this.staticPageService.getPage(url[1].path).PageTitle}${AppComponent.TITLE_SUFFIX}`);
                    this.isLoading = false;
                } else {
                    this.pageTitleService.title = "Loading...";
                    this.title.setTitle("Cocaine Anonymous London");
                }
            });

        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .filter((event: NavigationEnd) => !event.url.startsWith("/page/"))
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .filter(route => route.outlet === "primary")
            .mergeMap(route => route.data)
            .subscribe(data => {
                this.pageTitleService.title = data.title;
                this.title.setTitle(`${this.pageTitleService.title}${AppComponent.TITLE_SUFFIX}`);
                this.isLoading = false;
            });
    }
}