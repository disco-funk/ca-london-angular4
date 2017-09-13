import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterLinkWhatIsCaComponent } from './router-link.component';

describe('RouterLinkWhatIsCaComponent', () => {
  let component: RouterLinkWhatIsCaComponent;
  let fixture: ComponentFixture<RouterLinkWhatIsCaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterLinkWhatIsCaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterLinkWhatIsCaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
