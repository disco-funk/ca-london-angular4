import {Component} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import "rxjs/add/operator/filter";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  title: string;
  isCollapsed: boolean;

  constructor(private router: Router, route: ActivatedRoute) {
    this.isCollapsed = true;
    router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(() => {
        console.log("Inside");
        this.title = route.root.firstChild.snapshot.data["title"];
      });
  }
}
