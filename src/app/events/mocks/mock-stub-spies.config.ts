export const stub: IStubConfig = {
    location: {
        go: jasmine.createSpy("go")
    },
    uploadModalService: {
        show: jasmine.createSpy("show")
    },
    alertModalService: {
        show: jasmine.createSpy("show")
    },
    reset: () => {
        stub.alertModalService.show.calls.reset();
        stub.location.go.calls.reset();
        stub.uploadModalService.show.calls.reset();
    }
};

interface IStubConfig {
    location: { go: jasmine.Spy };
    uploadModalService: { show: jasmine.Spy };
    alertModalService: { show: jasmine.Spy };
    reset: Function;
}