import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {StaticPageService} from "./static-page.service";

@Component({
  selector: "app-static-page",
  templateUrl: "./static-page.component.html",
  styleUrls: ["./static-page.component.css"]
})
export class StaticPageComponent implements OnInit {

  pageName: string;
  pageContent: string;
  pageCacheReady: boolean;

  constructor(private route: ActivatedRoute, private staticPageService: StaticPageService) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.pageName = params.get("id");
        if (this.pageCacheReady) {
          this.pageContent = this.staticPageService.getPage(this.pageName).PageContent;
        }
      });

    this.staticPageService.pageCacheReady
      .subscribe(ready => {
        this.pageCacheReady = ready;
        if (ready) {
          this.pageContent = this.staticPageService.getPage(this.pageName).PageContent;
        }
      });
  }
}
