import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlViewComponent } from './access-control-view.component';

describe('AccessControlViewComponent', () => {
  let component: AccessControlViewComponent;
  let fixture: ComponentFixture<AccessControlViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessControlViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessControlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
