import {Component} from "@angular/core";

@Component({
    selector: "ca-router-link-whatisca",
    template: `<button class="btn btn-primary btn-lg float-right" role="button" routerLink="/page/whatisca">Learn More</button>`
})
export class RouterLinkWhatIsCaComponent {
}

@Component({
    selector: "ca-router-link-whoismem",
    template: `<button class="btn btn-primary btn-lg float-right" role="button" routerLink="/page/whoismem">Learn More</button>`
})
export class RouterLinkWhoIsMemComponent {
}

@Component({
    selector: "ca-router-link-meetings",
    template: `<button class="btn btn-primary btn-lg float-right" role="button" routerLink="/meetings">Find A Meeting</button>`
})
export class RouterLinkMeetingsComponent {
}

@Component({
    selector: "ca-router-link-12steps",
    template: `<button class="btn btn-primary" role="button" routerLink="/page/12steps">Show Me</button>`
})
export class RouterLink12StepsComponent {
}

@Component({
    selector: "ca-router-link-helpline",
    template: `<a routerLink="/page/helpline" class="alert-link">More Details&hellip;</a>`
})
export class RouterLinkHelplineComponent {
}