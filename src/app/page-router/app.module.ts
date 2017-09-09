import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {EventsComponent} from "../events/events.component";
import {MeetingsComponent} from "../meetings/meetings.component";
import {HomeComponent} from "../home/home.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {StaticPageComponent} from "../static-page/static-page.component";
import {APP_CONFIG, appConfig} from "../config/app.config";
import {HttpClientModule} from "@angular/common/http";
import {PageTitleService} from "../core/page-title.service";
import {StaticPageService} from "../static-page/static-page.service";

const appRoutes: Routes = [
    {
        path: "events",
        component: EventsComponent,
        data: {title: "Events"}
    },
    {
        path: "meetings",
        component: MeetingsComponent,
        data: {title: "Meetings"}
    },
    {
        path: "home",
        component: HomeComponent,
        data: {title: "Home"}
    },
    {
        path: "page/:id",
        component: StaticPageComponent
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "**",
        component: PageNotFoundComponent,
        data: {title: "Page Not Found"}
    }
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
        HttpClientModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        NgbModule.forRoot()
    ],
    providers: [
        {provide: APP_CONFIG, useValue: appConfig},
        PageTitleService,
        StaticPageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
