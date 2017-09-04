import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { EventsComponent } from "./events/events.component";
import { MeetingsComponent } from "./meetings/meetings.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { StaticPageComponent } from "./static-page/static-page.component";

const appRoutes: Routes = [
  { path: "events",
    component: EventsComponent,
    data: { title: "Events" }
  },
  {
    path: "meetings",
    component: MeetingsComponent,
    data: { title: "Meetings" }
  },
  {
    path: "home",
    component: HomeComponent,
    data: { title: "Home" }
  },
  {
    path: "page/:id",
    component: StaticPageComponent
  },
  { path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    MeetingsComponent,
    HomeComponent,
    PageNotFoundComponent,
    StaticPageComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
      // ,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
