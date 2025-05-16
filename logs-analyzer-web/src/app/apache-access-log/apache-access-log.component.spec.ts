import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApacheAccessLogComponent } from './apache-access-log.component';

describe('ApacheAccessLogComponent', () => {
  let component: ApacheAccessLogComponent;
  let fixture: ComponentFixture<ApacheAccessLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApacheAccessLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApacheAccessLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
