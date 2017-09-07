import {TestBed, inject} from "@angular/core/testing";
import {HttpClientTestingModule, TestRequest} from "@angular/common/http/testing";
import {HttpTestingController} from "@angular/common/http/testing";
import {StaticPageService} from "./static-page.service";
import {MockPages} from "./mocks/mock-pages.data";
import {APP_CONFIG} from "../config/app.config";
import {mockAppConfig} from "../config/mocks/mock-app.config";

describe("StaticPageService", () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticPageService, {provide: APP_CONFIG, useValue: mockAppConfig}],
      imports: [HttpClientTestingModule]
    });
  });

  describe("On initialisation", () => {
    beforeEach(() => {
      http = TestBed.get(HttpTestingController);
    });

    it("should load pages", inject([StaticPageService], (service: StaticPageService) => {
      const req: TestRequest = http.expectOne("http://my.url/api/pages?contentType");

      expect(req.request.method).toEqual("GET");

      req.flush(MockPages);

      expect(service.pageCache).toEqual(MockPages);
    }));

    afterEach(() => {
      http.verify();
    });
  });

  describe("#getPage", () => {
    it("should load pages", inject([StaticPageService], (service: StaticPageService) => {
      service.pageCache = MockPages;

      expect(service.getPage("whatisca")).toEqual(MockPages[0]);
    }));
  });
});
