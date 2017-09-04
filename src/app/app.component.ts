import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import "rxjs/add/operator/filter";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  title: string;
  isCollapsed: boolean;

  constructor(private router: Router, route:ActivatedRoute) {
    router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(() => this.title = route.root.firstChild.snapshot.data["title"]);
  }

  ngOnInit(): void {
    this.isCollapsed = true;
  }
}
