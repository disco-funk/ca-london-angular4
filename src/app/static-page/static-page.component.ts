import {Component, ComponentFactory, ComponentRef, ModuleWithComponentFactories, NgModule, OnInit} from "@angular/core";
import {StaticPageService} from "./static-page.service";
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from "@angular/router";
import {Compiler, ViewChild, ViewContainerRef} from "@angular/core";

@Component({
    selector: "ca-static-page",
    templateUrl: "static-page.component.html"
})
export class StaticPageComponent implements OnInit {

    @ViewChild("container", {read: ViewContainerRef}) container: ViewContainerRef;
    private isCacheReady: boolean;

    constructor(private router: Router, private staticPageService: StaticPageService,
                private activatedRoute: ActivatedRoute, private compiler: Compiler) {
        this.isCacheReady = false;
    }

    ngOnInit(): void {

        this.staticPageService.pageCacheReady
            .filter(isCacheReady => isCacheReady)
            .subscribe(() => {
                this.isCacheReady = true;
                const segments: Array<string> = this.router.url.split("/");

                this.addComponent(this.staticPageService.getPage(segments[2]).PageContent);
            });

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
                if (this.isCacheReady) {
                    this.addComponent(this.staticPageService.getPage(url[1].path).PageContent);
                }
            });
    }

    private addComponent(template: string, properties: any = {}): void {

        @Component({template})
        class TemplateComponent {
        }

        @NgModule({declarations: [TemplateComponent]})
        class TemplateModule {
        }

        this.container.clear();
        const mod: ModuleWithComponentFactories<TemplateModule> = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
        const factory: ComponentFactory<any> = mod.componentFactories.find((comp) =>
            comp.componentType === TemplateComponent);
        const component: ComponentRef<any> = this.container.createComponent(factory);

        Object.assign(component.instance, properties);
    }
}