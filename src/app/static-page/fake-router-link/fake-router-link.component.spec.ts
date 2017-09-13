import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeRouterLinkComponent } from './fake-router-link.component';

describe('FakeRouterLinkComponent', () => {
  let component: FakeRouterLinkComponent;
  let fixture: ComponentFixture<FakeRouterLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeRouterLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeRouterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
