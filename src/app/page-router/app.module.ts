import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {EventsComponent} from "../events/events.component";
import {MeetingsComponent} from "../meetings/meetings.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {StaticPageComponent} from "../static-page/static-page.component";
import {APP_CONFIG, appConfig} from "../config/app.config";
import {HttpClientModule} from "@angular/common/http";
import {PageTitleService} from "../core/page-title.service";
import {StaticPageService} from "../static-page/static-page.service";
import {EventComponent} from "../events/event.component";
import {SafeHtmlPipe} from "../events/safe-html.pipe";
import {EventsService} from "../events/events.service";
import {DatePipe} from "@angular/common";

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
        path: "page/:id",
        component: StaticPageComponent
    },
    {
        path: "",
        redirectTo: "/page/home",
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
        PageNotFoundComponent,
        StaticPageComponent,
        EventComponent
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
        StaticPageService,
        EventsService,
        DatePipe,
        SafeHtmlPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}