import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-static-page",
  templateUrl: "./static-page.component.html",
  styleUrls: ["./static-page.component.css"]
})
export class StaticPageComponent implements OnInit {

  pageName: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => this.pageName = params.get("id"));
  }
}
