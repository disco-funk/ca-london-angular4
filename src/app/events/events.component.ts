import { Component, OnInit } from "@angular/core";
import {IEvent} from "./event.interface";
import {EventsService} from "./events.service";

@Component({
  selector: "ca-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
    events: Array<IEvent>;

    isLoading: boolean;

    constructor(private eventsListService: EventsService) {
        this.events = [];
        this.isLoading = true;
    }

    ngOnInit(): void {
        this.eventsListService
            .getEvents()
            .subscribe(data => this.events = data,
                err => console.log(err),
                () => this.isLoading = false);
    }
}