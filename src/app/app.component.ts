import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import "rxjs/add/operator/filter";
import {StaticPageService} from "./static-page/static-page.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  title: string;
  isCollapsed: boolean;
  pageCacheReady: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private staticPageService: StaticPageService) {
    this.isCollapsed = true;
  }

  ngOnInit(): void {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(() => {
      console.log(this.route.root.firstChild.snapshot.url[0].path);
        if (this.route.root.firstChild.snapshot.url[0].path === "page") {
          if (this.pageCacheReady) {
            this.title = this.staticPageService.getPage(this.route.root.firstChild.snapshot.url[1].path).PageTitle;
          }
        } else {
          this.title = this.route.root.firstChild.snapshot.data["title"];
        }
      });

    this.staticPageService.pageCacheReady
      .subscribe(ready => {
        this.pageCacheReady = ready;
        if (ready && this.route.root.firstChild.snapshot.url[0].path === "page") {
          this.title = this.staticPageService.getPage(this.route.root.firstChild.snapshot.url[1].path).PageTitle;
        }
      });
  }
}
