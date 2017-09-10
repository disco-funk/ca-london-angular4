import {Component, Input} from "@angular/core";
import {IEvent} from "./event.interface";
import {DatePipe} from "@angular/common";

@Component({
    selector: "ca-event",
    templateUrl: "event.component.html"
})
export class EventComponent {

    @Input() eventDetails: IEvent;
    @Input() isEven: boolean;

    constructor(private datePipe: DatePipe) {
    }

    getFlyerHref(): string {
        return !this.eventDetails.FlyerName ? "#" : `./assets/images/events/${this.eventDetails.FlyerName}`;
    }

    getDetailsColumnClass(): Object {
        return {"col-sm-6": !!this.eventDetails.ThumbnailName, "col-sm-12": !this.eventDetails.ThumbnailName};
    }

    showEndDate(): boolean {
        const startDate: string = this.datePipe.transform(this.eventDetails.StartDate, "EEEE d MMMM yyyy");
        const endDate: string = this.datePipe.transform(this.eventDetails.EndDate, "EEEE d MMMM yyyy");
        return !!endDate && startDate !== endDate;
    }

    showEndTime(): boolean {
        return !!this.eventDetails.EndDate;
    }

    thumbnailPath(): string {
        return `./assets/images/events/${this.eventDetails.ThumbnailName}`;
    }
}