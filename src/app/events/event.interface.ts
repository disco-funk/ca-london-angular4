export interface IEvent {
    CAEventsID: number;
    EventNum: number;
    Revision: number;
    PreTitle?: string;
    Title: string;
    StartDate: string;
    EndDate?: string;
    Address?: string;
    Address1: string;
    Address2?: string;
    Address3?: string;
    City: string;
    Postcode?: string;
    Details?: string;
    FlyerName?: string;
    ThumbnailName?: string;
    TransDate: string;
    UserName: string;
    EventStatus: string;
}