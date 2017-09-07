import {MockPages} from "./mock-pages.data";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IPage} from "../page.interface";

export class MockStaticPageService {
  getPage(pageName: string): IPage {
    return MockPages[1];
  }

  get pageCacheReady(): BehaviorSubject<boolean> {
    return new BehaviorSubject<boolean>(true);
  }
}
