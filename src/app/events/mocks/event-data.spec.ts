import {IEvent} from "../event.interface";
import {IEventEditor} from "../event-editor.interface";

export const TestEvents: Array<IEvent> = [{
        CAEventsID: 2,
        EventNum: 2,
        Revision: 1,
        PreTitle: "The Steps We Took Meeting",
        Title: "Special Event",
        StartDate: "2027-03-09T19:00:00",
        EndDate: "2027-03-09T21:30:00",
        Address: "Fulham Methodist Church<br />452 Fulham Road",
        Address1: "Fulham Methodist Church",
        Address2: "452 Fulham Road",
        Address3: null,
        City: "London",
        Postcode: "SW6 1BY",
        Details: "To celebrate Nicholas L's impending milestone of 25 years of unbroken clean and sober time the Steps We Took meeting "
        + "of Cocaine Anonymous invites you to a special event. Nicholas will be sharing his story of Hope Faith and Courage whilst "
        + "presenting a workshop in the form of a fundraising Q and A session. Food fun and fellowship will be available on the night.",
        FlyerName: null,
        ThumbnailName: null,
        TransDate: "2016-12-29T15:53:10",
        UserName: "testtestcom",
        EventStatus: "ACTIVE"
    },
    {
        CAEventsID: 1,
        EventNum: 1,
        Revision: 1,
        PreTitle: "A CA World Services Event",
        Title: "Spoonless In Seattle",
        StartDate: "2027-06-30T00:00:00",
        EndDate: "2027-07-04T00:00:00",
        Address: "DoubleTree by Hilton Seattle Airport<br />18740 International Boulevard<br />Seattle<br />USA",
        Address1: "DoubleTree by Hilton Seattle Airport",
        Address2: "18740 International Boulevard",
        Address3: null,
        City: "Seattle",
        Postcode: null,
        Details: "The 2017 Annual CA World Convention. Visit the <a href=\"http://convention.ca.org\" target=\"_blank\">"
        + "CA World Services Website</a> for more information.",
        FlyerName: null,
        ThumbnailName: "2017-06-03-Spoonless-In-Seattle-CAWS.png",
        TransDate: "2016-12-29T15:53:10",
        UserName: "testtestcom",
        EventStatus: "ACTIVE"
    }
];

export const TestEventEditor: IEventEditor = {
    EventNum: 2,
    PreTitle: "The Steps We Took Meeting",
    Title: "Special Event",
    StartDate: new Date("2027-03-09T00:00:00"),
    EndDate: null,
    Address1: "Fulham Methodist Church",
    Address2: "452 Fulham Road",
    Address3: null,
    City: "London",
    Postcode: "SW6 1BY",
    Details: "To celebrate Nicholas L's impending milestone of 25 years of unbroken clean and sober time the Steps We Took meeting "
    + "of Cocaine Anonymous invites you to a special event. Nicholas will be sharing his story of Hope Faith and Courage whilst "
    + "presenting a workshop in the form of a fundraising Q and A session. Food fun and fellowship will be available on the night.",
    FlyerName: null,
    ThumbnailName: null
};