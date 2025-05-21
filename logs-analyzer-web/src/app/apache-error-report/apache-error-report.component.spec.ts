import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApacheErrorReportComponent } from './apache-error-report.component';

describe('ApacheErrorReportComponent', () => {
  let component: ApacheErrorReportComponent;
  let fixture: ComponentFixture<ApacheErrorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApacheErrorReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApacheErrorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
