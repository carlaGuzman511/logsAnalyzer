import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApacheAccessReportComponent } from './apache-access-report.component';

describe('ApacheAccessReportComponent', () => {
  let component: ApacheAccessReportComponent;
  let fixture: ComponentFixture<ApacheAccessReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApacheAccessReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApacheAccessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
