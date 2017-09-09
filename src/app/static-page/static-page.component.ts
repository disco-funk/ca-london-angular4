import {Component, OnInit} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {StaticPageService} from "./static-page.service";
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from "@angular/router";

@Component({
    selector: "ca-static-page",
    templateUrl: "./static-page.component.html",
    styleUrls: ["./static-page.component.css"]
})
export class StaticPageComponent implements OnInit {

    pageContent: SafeHtml;
    rawPageContent: string;

    constructor(private router: Router, private domSanitizer: DomSanitizer, private staticPageService: StaticPageService,
                private activatedRoute: ActivatedRoute) {
        this.rawPageContent = "";
    }

    ngOnInit(): void {


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

                this.rawPageContent = this.staticPageService.getPage(url[1].path).PageContent;
                this.pageContent = this.domSanitizer
                    .bypassSecurityTrustHtml(this.rawPageContent);
            });

        // this.staticPageService.pageCacheReady
        //     .filter(isCacheReady => isCacheReady)
        //     .subscribe(() => {
        //     });
    }
}